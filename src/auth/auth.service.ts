import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
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
    const hash = await bcrypt.hash(signUpData.password, config.HashSaltRound); // шифровка
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

  async createSuperAdmin(signUpData: ISignUp, developerPassword: string) {
    const developerPasswordHash = await bcrypt.hash(
      'superSecureDeveloperPassword',
      config.HashSaltRound,
    );
    const validDeveloperPassword = await bcrypt.compare(
      developerPassword,
      developerPasswordHash,
    );

    if (!validDeveloperPassword) {
      throw new UnauthorizedException('Invalid developer password');
    }

    const existingSuperAdmin = await this.usersService.findSuperAdmin();
    if (existingSuperAdmin) {
      throw new ConflictException('Super admin already exists');
    }

    const hash = await bcrypt.hash(signUpData.password, config.HashSaltRound);
    signUpData.password = hash;

    const createdSuperAdmin = await this.usersService.createUser(signUpData);

    const payload = {
      sub: createdSuperAdmin.id,
      email: createdSuperAdmin.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createAdmin(signUpData: ISignUp) {
    if (signUpData.role !== 'SuperAdmin') {
      throw new UnauthorizedException('Only super admins can create admins');
    }

    const hash = await bcrypt.hash(signUpData.password, config.HashSaltRound);
    signUpData.password = hash;

    const createdAdmin = await this.usersService.createUser(signUpData);

    const payload = {
      sub: createdAdmin.id,
      email: createdAdmin.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createSuperAdmin(signUpData: ISignUp, developerPassword: string) {
    const developerPasswordHash = await bcrypt.hash(
      'superSecureDeveloperPassword',
      config.HashSaltRound,
    );
    const validDeveloperPassword = await bcrypt.compare(
      developerPassword,
      developerPasswordHash,
    );

    if (!validDeveloperPassword) {
      throw new UnauthorizedException('Invalid developer password');
    }

    const existingSuperAdmin = await this.usersService.findSuperAdmin();
    if (existingSuperAdmin) {
      throw new ConflictException('Super admin already exists');
    }

    const hash = await bcrypt.hash(signUpData.password, config.HashSaltRound);
    signUpData.password = hash;

    const createdSuperAdmin = await this.usersService.createUser(signUpData);

    const payload = {
      sub: createdSuperAdmin.id,
      email: createdSuperAdmin.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createAdmin(signUpData: ISignUp) {
    if (signUpData.role !== 'SuperAdmin') {
      throw new UnauthorizedException('Only super admins can create admins');
    }

    const hash = await bcrypt.hash(signUpData.password, config.HashSaltRound);
    signUpData.password = hash;

    const createdAdmin = await this.usersService.createUser(signUpData);

    const payload = {
      sub: createdAdmin.id,
      email: createdAdmin.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
