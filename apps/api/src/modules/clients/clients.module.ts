import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'

import { CommonModule } from '../common/common.module'
import { ClientsResolver } from './clients.resolver'
import { ClientsService } from './clients.service'

@Module({
  imports: [ConfigModule, CommonModule, PrismaModule],
  providers: [ClientsService, ClientsResolver],
  exports: [ClientsService],
})
export class ClientsModule {}
