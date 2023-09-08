import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { GenerateImageUrlInput } from '../common/util/generate-image-url.input'
import { UpdateUserPasswordInput } from './dto/update-user-password.input'
import { UserResponse } from './dto/users/user.response'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // [Todo] 一時的なコード20230826
  @Query(() => [UserResponse])
  async users(): Promise<UserResponse[]> {
    return this.usersService.adminGetUsers()
  }

  @Mutation(() => String)
  async generateUserImageUrl(@Args('data') generateImageUrlInput: GenerateImageUrlInput): Promise<string> {
    return this.usersService.generateUserImageUrl(generateImageUrlInput.name, generateImageUrlInput.fileType)
  }

  @Mutation(() => String)
  async generateIdDocumentImageUrl(@Args('data') generateImageUrlInput: GenerateImageUrlInput): Promise<string> {
    return this.usersService.generateIdDocumentImageUrl(generateImageUrlInput.name, generateImageUrlInput.fileType)
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async userUpdatePassword(@CurrentUser() user: User, @Args('data') data: UpdateUserPasswordInput): Promise<boolean> {
    return this.usersService.updatePassword(user.id, data.password)
  }
}
