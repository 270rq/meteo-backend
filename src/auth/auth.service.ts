import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException
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
    enteredPassword: string,
): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(mail);
    if (!user) {
        throw new NotFoundException('User not found');
    }
    
    const isMatch = await bcrypt.compare(enteredPassword, user.hashPassword);
    if (!isMatch) {
        throw new UnauthorizedException('Invalid password');
    }
    
    const payload = {
        sub: user.id,
        email: user.email,
    };
    
    return {
        access_token: await this.jwtService.signAsync(payload),
    };
}
  async signUp(signUpData: ISignUp) {
    const user = await this.usersService.findOneByEmail(signUpData.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const hash = await bcrypt.hash(signUpData.password, config.HashSaltRound); // шифровка
    signUpData.password = hash;
    const createdUser = await this.usersService.createUser(signUpData);
    console.log(createdUser);
    console.log(signUpData);
    const payload = {
      sub: createdUser.id,
      email: createdUser.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
}
}
