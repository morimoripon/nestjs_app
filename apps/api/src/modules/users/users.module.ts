import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'

import { CommonModule } from '../common/common.module'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [ConfigModule, CommonModule, PrismaModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
