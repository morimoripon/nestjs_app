import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

import { ImageUtils } from '../src/modules/common/util/image.utils'
import { UsersService } from '../src/modules/users/users.service'
import { genItem } from './fixtures/item'
import { genUsers } from './fixtures/user'
import { ItemsService } from '../src/modules/item/items.service'

const prisma = new PrismaClient()

const main = async () => {
  console.log('💫 seed executing ...')

  const prismaService = new PrismaService()
  const configService = new ConfigService()
  const imageUtils = new ImageUtils(configService)
  const usersService = new UsersService(prismaService, imageUtils)
  const itemsService = new ItemsService(prismaService, imageUtils)

  const users = await genUsers()
  const userDatas = await Promise.all(
    users.map(user =>
      usersService.create({
        data: user,
      }),
    ),
  )

  await Promise.all(
    userDatas.map((userData, index) => {
      if (userData.errorMessage) {
        console.log(userData.errorMessage)
        return null
      }
      const items = genItem(userData.user, index + 1);
      return items.map(item =>
        itemsService.create(userData.user.id, item)
      )
    }),
  )

  console.log('💫 seed finished.')
}
main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
