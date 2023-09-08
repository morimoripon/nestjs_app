import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator'
import { ActivateUserInput } from './dto/activate-user.input'
import { CurrentUserResponse } from './dto/current-user.response'
import { ResetPasswordInput } from './dto/reset-password.input'
import { SetNewPasswordInput } from './dto/set-new-password.input'
import { UserLineSignUpInput } from './dto/user-line-signup.input'
import { UserLoginInput } from './dto/user-login.input'
import { UserLoginResponse } from './dto/user-login.response'
import { UserSignUpInput } from './dto/user-signup.input'
import { UserSignUpResponse } from './dto/user-signup.response'
import { UserUpdateInput } from './dto/user-update.input'
import { GqlAuthGuard } from './guards/gql-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Mutation(() => UserLoginResponse)
  @UseGuards(GqlAuthGuard)
  async loginUser(@Args('data') userLoginInput: UserLoginInput, @Context() context) {
    return this.authService.loginUser(context.user)
  }

  @Mutation(() => UserLoginResponse)
  @UseGuards(GqlAuthGuard)
  async loginAdmin(@Args('data') userLoginInput: UserLoginInput, @Context() context) {
    return this.authService.loginAdmin(context.user)
  }

  @Query(() => CurrentUserResponse, { name: 'currentUser' })
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    return user
  }

  @Mutation(() => UserSignUpResponse)
  async signUpUser(@Args('data') userSignUpInput: UserSignUpInput) {
    return this.authService.signUp(userSignUpInput)
  }

  @Mutation(() => Boolean)
  async updateAuth(@Args('data') userUpdateInput: UserUpdateInput) {
    return this.authService.update(userUpdateInput)
  }
}
