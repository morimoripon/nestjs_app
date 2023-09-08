import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'

import { CommonModule } from '../common/common.module'
import { FormSettingsResolver } from './form-settings.resolver'
import { FormSettingsService } from './form-settings.service'

@Module({
  imports: [ConfigModule, CommonModule, PrismaModule],
  providers: [FormSettingsService, FormSettingsResolver],
  exports: [FormSettingsService],
})
export class FormSettingsModule {}
