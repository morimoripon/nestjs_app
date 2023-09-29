import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'

import { CommonModule } from '../common/common.module'
import { ItemsResolver } from './items.resolver'
import { ItemsService } from './items.service'

@Module({
  imports: [ConfigModule, CommonModule, PrismaModule],
  providers: [ItemsService, ItemsResolver],
  exports: [ItemsService],
})
export class ItemsModule {}
