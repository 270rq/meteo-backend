export interface IUser {
  email: string;
  password: string;
  flowerId?: number;
  nickname?: string;
  receive_notifications?: boolean;
  x?: number;
  y?: number;
}
