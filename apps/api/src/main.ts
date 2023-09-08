import { NestFactory } from '@nestjs/core'
import { PrismaService } from 'nestjs-prisma'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  })

  // enable shutdown hook
  const prismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  await app.listen(4000)
}
bootstrap()
