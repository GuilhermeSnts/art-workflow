import path from "path";

export function getAppDir() {
  return path.dirname(process.execPath);
}