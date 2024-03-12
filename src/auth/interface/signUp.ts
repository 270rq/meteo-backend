import { TUserRoles } from 'src/enum/user-role';

export interface ISignUp {
  email: string;
  password: string;
  flowerId: number;
  role: TUserRoles;
}
