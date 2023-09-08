import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ImageUtils } from './util/image.utils'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ImageUtils],
  exports: [ImageUtils],
})
export class CommonModule {}
