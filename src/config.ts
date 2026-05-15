import fs from 'node:fs';
import path from 'node:path';
import { AppConfig } from "./types";

export function loadConfig(): AppConfig {
  const configPath = path.resolve("config.json");

  if (!fs.existsSync(configPath)) {
    throw new Error("config.json não encontrado");
  }

  const raw = fs.readFileSync(configPath, "utf-8");

  return JSON.parse(raw);
}