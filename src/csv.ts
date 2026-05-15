import fs from "node:fs";

export function ensureCsv(
  csvPath: string
) {
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(
      csvPath,
      "input,output\n"
    );

    console.log("[CSV] criado");
  }
}

export function isProcessed(
  csvPath: string,
  input: string
): boolean {
  const content = fs.readFileSync(
    csvPath,
    "utf-8"
  );

  return content.includes(input);
}

export function appendCsv(
  csvPath: string,
  input: string,
  output: string
) {
  fs.appendFileSync(
    csvPath,
    `${input},${output}\n`
  );
}