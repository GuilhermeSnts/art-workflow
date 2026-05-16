import chokidar from "chokidar";
import path from "path";

import { AppConfig } from "./types";
import { isProcessed } from "./csv";
import { processZip } from "./processor";

export function startWatcher(
  config: AppConfig
) {
  console.log("[WATCHER] iniciado");

  const watcher = chokidar.watch(
    config.watchFolder,
    {
      ignoreInitial: false,
      persistent: true,
      
      awaitWriteFinish: {
        stabilityThreshold: 3000,
        pollInterval: 250
      }
    }
  );

  watcher.on("add", async (filePath) => {
    if (!filePath.endsWith(".zip")) {
      return;
    }

    const fileName = path.basename(filePath);

    if (isProcessed(
      config.csvPath,
      fileName
    )) {
      console.log(
        "[WATCHER] já processado:",
        fileName
      );

      return;
    }

    try {
      await processZip(filePath, config);
    } catch (err) {
      console.error(
        "[WATCHER] erro:",
        err
      );
    }
  });
}