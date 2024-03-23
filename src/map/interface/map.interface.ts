import { ICord } from './cord-map.dto';

export interface IMap {
  day: Date;
  flowerId: number;
  cord: ICord[];
  lvl: number;
}
