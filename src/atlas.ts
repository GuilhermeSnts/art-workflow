import fs from "node:fs";
import path from "node:path";

import { AppConfig, AtlasData, AtlasFrame } from "./types";

export async function createAtlas(
  spritePath: string,
  config: AppConfig,
  frameWidth: number,
  frameHeight: number,
  frameCount: number
): Promise<string> {
  const scale = typeof config.sprite.scale === "number"
    ? config.sprite.scale
    : 1;

  const scaledFrameWidth = Math.round(frameWidth * scale);
  const scaledFrameHeight = Math.round(frameHeight * scale);
  const columns = config.sprite.columns;
  const rows = Math.ceil(frameCount / columns);

  const atlasFileName = `${path.basename(spritePath, ".png")}.atlas.json`;

  const atlasPath = path.resolve(
    config.outputFolder,
    atlasFileName
  );

  const frames: AtlasFrame[] = [];

  for (let index = 0; index < frameCount; index += 1) {
    const x = (index % columns) * scaledFrameWidth;
    const y = Math.floor(index / columns) * scaledFrameHeight;

    frames.push({
      name: `frame_${index}`,
      x,
      y,
      width: scaledFrameWidth,
      height: scaledFrameHeight
    });
  }

  const atlas: AtlasData = {
    image: path.basename(spritePath),
    size: {
      width: scaledFrameWidth * columns,
      height: scaledFrameHeight * rows
    },
    frames
  };

  fs.writeFileSync(
    atlasPath,
    JSON.stringify(atlas, null, 2),
    "utf-8"
  );

  console.log("[ATLAS] criado:", atlasPath);
  return atlasFileName;
}
