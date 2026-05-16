import fs from "fs";

function escapeCsv(value: string) {
  if (value.includes("\n") || value.includes(",") || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }

  return value;
}

export function ensureCsv(
  csvPath: string
) {
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(
      csvPath,
      "input,output,atlas\n"
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
  output: string,
  atlas?: string
) {
  fs.appendFileSync(
    csvPath,
    `${escapeCsv(input)},${escapeCsv(output)},${escapeCsv(atlas ?? "")}\n`
  );
}