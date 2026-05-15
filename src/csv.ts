import fs from "node:fs";
import path from "node:path";

const CSV_PATH = path.resolve("processed.csv");

export function ensureCsv() {
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(
      CSV_PATH,
      "input,output\n"
    );

    console.log("[CSV] criado");
  }
}

export function isProcessed(input: string): boolean {
  const content = fs.readFileSync(CSV_PATH, "utf-8");

  return content.includes(input);
}

export function appendCsv(
  input: string,
  output: string
) {
  fs.appendFileSync(
    CSV_PATH,
    `${input},${output}\n`
  );
}