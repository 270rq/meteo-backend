import { IUser } from './create-user.interface';

export interface IUpdateUser extends Partial<IUser> {
  email: string;
  flowerId?: number;
  nickname?: string;
  receive_notifications?: boolean;
  x?: number;
  y?: number;
}
