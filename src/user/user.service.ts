import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { ISignUp } from 'src/auth/interface/signUp';
import { UserRoles } from 'src/enum/user-role';
import * as bcrypt from 'bcrypt';
import { config } from 'config/config';
import { IUpdateUser } from './interface/update-user.interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: ISignUp) {
    const hash = await bcrypt.hash(user.password, Number(config.HashSaltRound));
    return this.prisma.user.create({
      data: {
        email: user.email,
        hashPassword: hash,
        role: UserRoles.user,
      },
    });
  }

  async createAdmin(user: ISignUp) {
    const userDb = await this.findOneByEmail(user.email);
    if (userDb) {
      throw new ConflictException('User already exists');
    }
    const hash = await bcrypt.hash(user.password, Number(config.HashSaltRound));
    return this.prisma.user.create({
      data: {
        email: user.email,
        hashPassword: hash,
        flowerId: user.flowerId,
        role: UserRoles.admin,
      },
    });
  }

  async findSuperAdmin() {
    return this.prisma.user.findFirst({
      where: { role: 'superAdmin' },
    });
  }

  async findAndCount() {
    const users = await this.prisma.user.findMany();
    const totalCount = await this.prisma.user.count();
    return { rows: users, count: totalCount };
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: number, user: IUpdateUser) {
    return this.prisma.user.update({
      where: { id },
      data: {
        email: user.email,
        flowerId: user.flowerId,
        nickname: user.nickname,
        receive_notifications: user.receive_notifications,
      },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findUsersWithNotifications() {
    return this.prisma.user.findMany({
      where: { receive_notifications: true },
    });
  }
}
