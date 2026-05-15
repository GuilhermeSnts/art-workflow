export interface AppConfig {
  watchFolder: string;
  outputFolder: string;

  sprite: {
    columns: number;
    scale: number;
    gap: number;
  };
}