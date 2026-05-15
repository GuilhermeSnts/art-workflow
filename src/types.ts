export interface AppConfig {
  watchFolder: string;
  outputFolder: string;
  csvPath: string;
  generateAtlas?: boolean;

  sprite: {
    columns: number;
    scale: number;
    gap: number;
  };
}

export interface AtlasFrame {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AtlasData {
  image: string;
  size: {
    width: number;
    height: number;
  };
  frames: AtlasFrame[];
}