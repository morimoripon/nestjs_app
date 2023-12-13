import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UserLoginInput } from './dto/user-login.input';
import { UserLoginResponse } from './dto/user-login.response';
import { UserSignUpInput } from './dto/user-signup.input';
import { UserSignUpResponse } from './dto/user-signup.response';
import { UserUpdateInput } from './dto/user-update.input';
export declare class AuthResolver {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    loginUser(userLoginInput: UserLoginInput, context: any): Promise<UserLoginResponse>;
    loginAdmin(userLoginInput: UserLoginInput, context: any): Promise<UserLoginResponse>;
    getCurrentUser(user: User): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import(".prisma/client").Role;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }, unknown, never> & {}>;
    signUpUser(userSignUpInput: UserSignUpInput): Promise<UserSignUpResponse>;
    updateAuth(userUpdateInput: UserUpdateInput): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import(".prisma/client").Role;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }, unknown, never> & {}>;
}
