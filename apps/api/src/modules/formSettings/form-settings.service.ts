import { Injectable } from '@nestjs/common'
import { FormSetting } from '@prisma/client'
import { FindManyFormSettingArgs, FormSettingFindUniqueArgs } from '@prisma/client/generator-build'
import { PrismaService } from 'nestjs-prisma'

import { ImageUtils } from '../common/util/image.utils'
import { CreateFormSettingInput } from './dto/create-form-setting.input'
import { GetMyFormSettingResponse } from './dto/get-my-form-setting.response'
import { UpdateFormSettingInput } from './dto/update-form-setting.input'

@Injectable()
export class FormSettingsService {
  constructor(private readonly prisma: PrismaService, private readonly imageUtils: ImageUtils) {}

  async findUnique(args: FormSettingFindUniqueArgs): Promise<FormSetting | null> {
    return this.prisma.formSetting.findUnique(args)
  }

  async findMany(args: FindManyFormSettingArgs): Promise<FormSetting[] | null> {
    return this.prisma.formSetting.findMany(args)
  }

  async getMyFormSetting(userId: string): Promise<GetMyFormSettingResponse> {
    return this.prisma.formSetting.findUnique({
      where: {
        userId,
      },
    })
  }

  async create(userId: string, args: CreateFormSettingInput): Promise<boolean> {
    await this.prisma.formSetting.create({
      data: {
        ...args,
        userId,
      },
    })
    return true
  }

  async update(userId: string, args: UpdateFormSettingInput): Promise<boolean> {
    const formSetting = await this.prisma.formSetting.findUnique({
      where: {
        userId,
      },
    })
    if (!formSetting) {
      return false
    }

    await this.prisma.formSetting.update({
      where: {
        userId,
      },
      data: {
        ...args,
      },
    })
    return true
  }
}
