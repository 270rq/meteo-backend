export interface IManyMap {
  date: Date;
  flowerId?: number;
  coords: coord[];
  lvl: number;
}

interface coord {
  x: number;
  y: number;
}
