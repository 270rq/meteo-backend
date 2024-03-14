import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { config } from 'config/config';
import { ISignUp } from './interface/signUp';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    mail: string,
    hashPassword: string,
  ): Promise<{ id: number; access_token: string }> {
    console.log(hashPassword);
    const user = await this.usersService.findOneByEmail(mail);
    console.log(user);
    const isMatch = await bcrypt.compare(user.hashPassword, hashPassword);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpData: ISignUp) {
    const user = await this.usersService.findOneByEmail(signUpData.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hash = await bcrypt.hash(signUpData.password, config.HashSaltRound);
    signUpData.password = hash;
    const createdUser = await this.usersService.createUser(signUpData);
    console.log(createdUser);
    console.log(signUpData);
    const payload = {
      email: createdUser.email,
      id: createdUser.id,
    };
    return {
      id: createdUser.id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
