import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { IUser } from './interface/create-user.interface';
import { ISignUp } from 'src/auth/interface/signUp';
import { UserRoles } from 'src/enum/user-role';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: ISignUp) {
    return this.prisma.user.create({
      data: {
        email: user.email,
        hashPassword: user.password,
        flowerId: user.flowerId,
        role: UserRoles.user,
      },
    });
  }
  async createAdmin(user: ISignUp) {
    return this.prisma.user.create({
      data: {
        email: user.email,
        hashPassword: user.password,
        flowerId: user.flowerId,
        role: UserRoles.admin,
      },
    });
  }

  async findSuperAdmin() {
    const superAdmin = await this.prisma.user.findFirst({
      where: { role: 'superAdmin' },
    });

    return superAdmin;
  }

  async findAndCount() {
    const users = await this.prisma.user.findMany();
    const totalCount = await this.prisma.user.count();

    const resListDto = {
      rows: users,
      count: totalCount,
    };

    return resListDto;
  }

  async findOneByEmail(mail: string) {
    return this.prisma.user.findFirst({ where: { email: mail } });
  }
  async findOneById(id: number) {
    return this.prisma.user.findFirst({ where: { id } });
  }
  async updateUser(id: number, user: IUser) {
    return this.prisma.user.update({
      where: { id: id },
      data: user,
    });
  }
}
