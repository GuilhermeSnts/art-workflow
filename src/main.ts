import fs from "node:fs";
import path from "node:path";

import { loadConfig } from "./config";
import { ensureCsv } from "./csv";
import { startWatcher } from "./watcher";

function ensurePathExists(
  folderPath: string
) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {
      recursive: true
    });

    console.log(
      "[INIT] pasta criada:",
      folderPath
    );
  }
}

function ensureFolders() {
  const folders = [
    "incoming",
    "sprites",
    "temp"
  ];

  for (const folder of folders) {
    const fullPath = path.resolve(folder);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, {
        recursive: true
      });

      console.log(
        "[INIT] pasta criada:",
        folder
      );
    }
  }
}

async function bootstrap() {
  console.log("====================");
  console.log(" SPRITE ROBOT ");
  console.log("====================");

  const config = loadConfig();

  ensurePathExists(config.watchFolder);
  ensurePathExists(config.outputFolder);

  ensureCsv(config.csvPath);

  startWatcher(config);
}

bootstrap().catch(console.error);