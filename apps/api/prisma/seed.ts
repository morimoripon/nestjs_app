import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

import { ImageUtils } from '../src/modules/common/util/image.utils'
import { UsersService } from '../src/modules/users/users.service'
import { genFormSettings } from './fixtures/form-setting'
import { genUsers } from './fixtures/user'

const prisma = new PrismaClient()

const main = async () => {
  console.log('💫 seed executing ...')

  const prismaService = new PrismaService()
  const configService = new ConfigService()
  const imageUtils = new ImageUtils(configService)
  const usersService = new UsersService(prismaService, imageUtils)

  const users = await genUsers()
  const userDatas = await Promise.all(
    users.map(user =>
      usersService.create({
        data: user,
      }),
    ),
  )

  await Promise.all(
    userDatas.map(userData => {
      if (userData.errorMessage) {
        return null
      }
      return prismaService.formSetting.create({
        data: genFormSettings(userData.user),
      })
    }),
  )

  console.log('💫 seed finished.')
}
main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
