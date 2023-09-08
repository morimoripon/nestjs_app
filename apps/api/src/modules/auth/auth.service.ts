import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'nestjs-prisma'
import { v4 as uuid } from 'uuid'

import { UsersService } from '../users/users.service'
import { ResetPasswordInput } from './dto/reset-password.input'
import { SetNewPasswordInput } from './dto/set-new-password.input'
import { UserLoginResponse } from './dto/user-login.response'
import { UserSignUpInput } from './dto/user-signup.input'
import { UserSignUpResponse } from './dto/user-signup.response'
import { UserUpdateInput } from './dto/user-update.input'
import { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUnique({
      where: { email: email },
    })

    if (user && bcrypt.compareSync(password, user.password)) {
      return user
    }

    return null
  }

  async loginAdmin(user: User): Promise<UserLoginResponse> {
    const payload: JwtPayload = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin', 'user'],
        'x-hasura-default-role': 'admin',
        'x-hasura-user-id': user.id,
        'x-hasura-role': 'admin',
      },
      sub: user.id,
      iat: Date.now() / 1000,
    }

    return {
      jwtToken: this.jwtService.sign(payload, {
        expiresIn: '30d', // 30日間
      }),
    }
  }

  async loginUser(user: User): Promise<UserLoginResponse> {
    const payload: JwtPayload = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin', 'user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id,
        'x-hasura-role': 'user',
      },
      sub: user.id,
      iat: Date.now() / 1000,
    }

    return {
      jwtToken: this.jwtService.sign(payload, {
        expiresIn: '30d', // 30日間
      }),
    }
  }

  async signUp(userSignUpInput: UserSignUpInput): Promise<UserSignUpResponse> {
    userSignUpInput.password = await bcrypt.hash(userSignUpInput.password, 10)
    const { user, errorMessage } = await this.usersService.create({ data: userSignUpInput })

    if (!!errorMessage) {
      return { jwtToken: '', errorMessage: errorMessage }
    }

    const payload: JwtPayload = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['admin', 'user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.id,
        'x-hasura-role': 'user',
      },
      sub: user.id,
      iat: Date.now() / 1000,
    }

    return {
      userId: user.id,
      jwtToken: this.jwtService.sign(payload, {
        expiresIn: '30d', // 30日間
      }),
      errorMessage: '',
    }
  }

  async generatePasswordResetLink(userId: string) {
    const resetToken = uuid()

    await this.usersService.update({
      where: { id: userId },
      data: {
        resetToken,
      },
    })
    const resetPasswordLink = `${this.configService.get<string>(
      'WEB_URL',
    )}/change_password?user_id=${userId}&reset_token=${resetToken}`

    return resetPasswordLink
  }

  async update(userUpdateInput: UserUpdateInput): Promise<User> {
    // TODO: whereが存在していない
    const args = { data: userUpdateInput, where: {} }
    return args.data.password
      ? this.prisma.user.update({
          where: args.where,
          data: {
            ...args.data,
            password: await bcrypt.hash(args.data.password, 10),
          },
        })
      : this.prisma.user.update({
          where: args.where,
          data: {
            ...args.data,
          },
        })
  }

  // private getJwtPayload(userId: string): JwtPayload {
  //   return {
  //     'https://hasura.io/jwt/claims': {
  //       'x-hasura-allowed-roles': ['admin', 'user'],
  //       'x-hasura-default-role': 'user',
  //       'x-hasura-user-id': userId,
  //       'x-hasura-role': 'user',
  //     },
  //     sub: userId,
  //     iat: Date.now() / 1000,
  //   }
  // }

  private generateRandomPassword(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
    let password = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      password += characters[randomIndex]
    }

    return password
  }
}
