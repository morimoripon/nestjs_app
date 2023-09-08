import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreateFormSettingInput } from './dto/create-form-setting.input'
import { GetMyFormSettingResponse } from './dto/get-my-form-setting.response'
import { UpdateFormSettingInput } from './dto/update-form-setting.input'
import { FormSettingsService } from './form-settings.service'

@Resolver()
export class FormSettingsResolver {
  constructor(private readonly formSettingsService: FormSettingsService) {}

  @Query(() => GetMyFormSettingResponse)
  @UseGuards(JwtAuthGuard)
  async getMyFormSetting(@CurrentUser() user: User): Promise<GetMyFormSettingResponse> {
    return this.formSettingsService.getMyFormSetting(user.id)
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async createFormSetting(@CurrentUser() user: User, @Args('data') data: CreateFormSettingInput): Promise<boolean> {
    return this.formSettingsService.create(user.id, data)
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async updateFormSetting(@CurrentUser() user: User, @Args('data') data: UpdateFormSettingInput): Promise<boolean> {
    return this.formSettingsService.update(user.id, data)
  }
}
