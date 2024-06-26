import { ICord } from './cord-map.dto';

export interface IMap {
  date: Date;
  flowerId: number;
  cord: ICord[];
  lvl: number;
}
