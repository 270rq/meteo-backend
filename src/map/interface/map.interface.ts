import { ICord } from './cord-map.dto';

export interface IMap {
  createdAt: Date;
  date: Date;
  flowerId: number;
  cord: ICord[];
  lvl: number;
}
