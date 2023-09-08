import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { Category, Title, User } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

import { ImageUtils } from '../common/util/image.utils'
import { UsersService } from './form-settings.service'

describe('UsersService', () => {
  let service: UsersService, prisma: PrismaService, title: Title, category: Category, seller: User

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [UsersService, PrismaService, ImageUtils, ConfigService],
    }).compile()

    service = module.get<UsersService>(UsersService)
    prisma = module.get(PrismaService)
    category = await prisma.category.create({
      data: { name: 'testCategory' },
    })
    title = await prisma.title.create({
      data: { name: 'testTitle', categoryId: category.id },
    })
  })

  afterEach(async () => {
    await prisma.review.deleteMany()
    await prisma.deal.deleteMany()
    await prisma.item.deleteMany()
    await prisma.stripePayment.deleteMany()
    await prisma.message.deleteMany()
    await prisma.stripeInvoice.deleteMany()
    await prisma.user.deleteMany()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
