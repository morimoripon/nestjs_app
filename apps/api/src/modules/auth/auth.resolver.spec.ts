import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'nestjs-prisma'

import { ImageUtils } from '../common/util/image.utils'
import { UsersService } from '../users/users.service'
import { AuthModule } from './auth.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

describe('AuthResolver', () => {
  let resolver: AuthResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [AuthResolver, AuthService, UsersService, JwtService, PrismaService, ConfigService, ImageUtils],
    }).compile()

    resolver = module.get<AuthResolver>(AuthResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
