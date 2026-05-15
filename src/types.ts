export interface AppConfig {
  watchFolder: string;
  outputFolder: string;
  csvPath: string;

  sprite: {
    columns: number;
    scale: number;
    gap: number;
  };
}