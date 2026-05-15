import fs from "node:fs";
import path from "node:path";

import AdmZip from "adm-zip";
import sharp from "sharp";

import { AppConfig } from "./types";
import { appendCsv } from "./csv";
import { createAtlas } from "./atlas";

export async function processZip(
  zipPath: string,
  config: AppConfig
) {
  console.log("[PROCESS]", zipPath);

  const zip = new AdmZip(zipPath);

  const entries = zip
    .getEntries()
    .filter(e => e.entryName.endsWith(".png"));

  if (!entries.length) {
    console.log("[PROCESS] nenhum PNG encontrado");
    return;
  }

  const images = [];

  for (const entry of entries) {
    const buffer = entry.getData();

    const metadata = await sharp(buffer).metadata();

    images.push({
      input: buffer,
      width: metadata.width || 0,
      height: metadata.height || 0
    });
  }

  const frameWidth = images[0].width;
  const frameHeight = images[0].height;

  const columns = config.sprite.columns;
  const rows = Math.ceil(images.length / columns);

  const sheetWidth = frameWidth * columns;
  const sheetHeight = frameHeight * rows;

  const composites = images.map((img, index) => {
    const x = (index % columns) * frameWidth;
    const y = Math.floor(index / columns) * frameHeight;

    return {
      input: img.input,
      left: x,
      top: y
    };
  });

  const outputBuffer = await sharp({
    create: {
      width: sheetWidth,
      height: sheetHeight,
      channels: 4,
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0
      }
    }
  })
    .composite(composites)
    .png()
    .toBuffer();

  const resizedBuffer = await sharp(outputBuffer)
    .resize({
      width: Math.floor(
        sheetWidth * config.sprite.scale
      )
    })
    .png()
    .toBuffer();

  const fileName = path.basename(
    zipPath,
    ".zip"
  );

  const safeName = `sprite-${fileName.replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const outputPath = path.resolve(
    config.outputFolder,
    `${safeName}.png`
  );

  fs.writeFileSync(
    outputPath,
    resizedBuffer
  );

  let atlasPath: string | undefined;

  if (config.generateAtlas) {
    atlasPath = await createAtlas(
      outputPath,
      config,
      frameWidth,
      frameHeight,
      images.length
    );
  }

  appendCsv(
    config.csvPath,
    path.basename(zipPath),
    `${safeName}.png`,
    atlasPath
  );

  console.log("[DONE]", outputPath);
}