import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import {
  CreateOneUserArgs,
  DeleteOneUserArgs,
  FindManyUserArgs,
  UpdateOneUserArgs,
  UserFindUniqueArgs,
} from '@prisma/client/generator-build'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'nestjs-prisma'

import { ImageUtils } from '../common/util/image.utils'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly imageUtils: ImageUtils) {}

  async findUnique(args: UserFindUniqueArgs): Promise<User | null> {
    return this.prisma.user.findUnique(args)
  }

  async findMany(args: FindManyUserArgs): Promise<User[] | null> {
    return this.prisma.user.findMany(args)
  }

  async adminGetUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        formSetting: true,
      },
    })
  }

  async create(args: CreateOneUserArgs): Promise<{ user: User; errorMessage: string }> {
    let errorMessage = ''
    const user: User = await this.prisma.user
      .create({
        data: {
          ...args.data,
        },
      })
      .catch(e => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            errorMessage = '既に登録されているメールアドレスです'
            throw new Error(errorMessage)
          } else {
            throw e
          }
        }
        return null
      })
    return {
      user,
      errorMessage,
    }
  }

  async update(args: UpdateOneUserArgs): Promise<User> {
    return this.prisma.user.update(args)
  }

  async delete(args: DeleteOneUserArgs): Promise<User> {
    return this.prisma.user.delete(args)
  }

  async generateUserImageUrl(filename: string, fileType: string) {
    return await this.imageUtils.generateImageUrl(filename, fileType, 'users')
  }

  async generateIdDocumentImageUrl(filename: string, fileType: string): Promise<string> {
    return await this.imageUtils.generateImageUrl(filename, fileType, 'documents')
  }

  async updatePassword(userId: string, password: string): Promise<boolean> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: await bcrypt.hash(password, 10),
        },
      })

      return true
    } catch (e) {
      return false
    }
  }
}
