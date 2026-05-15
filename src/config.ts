import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import { AppConfig } from "./types.js";

function resolveUserPath(inputPath: string) {
  if (inputPath.startsWith("~/")) {
    return path.join(
      os.homedir(),
      inputPath.slice(2)
    );
  }

  return path.resolve(inputPath);
}

function ensureConfigPath(name: string, value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing or invalid config value: ${name}`);
  }

  return value;
}

export function loadConfig(): AppConfig {
  const configPath = path.resolve("config.json");

  if (!fs.existsSync(configPath)) {
    throw new Error(
      "config.json não encontrado"
    );
  }

  const raw = fs.readFileSync(
    configPath,
    "utf-8"
  );

  const config: AppConfig = JSON.parse(raw);

  const watchFolder = ensureConfigPath(
    "watchFolder",
    config.watchFolder
  );
  const outputFolder = ensureConfigPath(
    "outputFolder",
    config.outputFolder
  );
  const csvPath = ensureConfigPath(
    "csvPath",
    config.csvPath
  );

  const generateAtlas = config.generateAtlas === true;

  config.watchFolder = resolveUserPath(watchFolder);
  config.outputFolder = resolveUserPath(outputFolder);
  config.csvPath = resolveUserPath(csvPath);
  config.generateAtlas = generateAtlas;

  return config;
}