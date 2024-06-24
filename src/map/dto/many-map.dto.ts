export interface IManyMap {
  date: Date;
  flowerId?: number;
  coords: coord[];
  lvl: number;
}

export interface coord {
  x: number;
  y: number;
}
