import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from '../users/users.service';
import { UserLoginResponse } from './dto/user-login.response';
import { UserSignUpInput } from './dto/user-signup.input';
import { UserSignUpResponse } from './dto/user-signup.response';
import { UserUpdateInput } from './dto/user-update.input';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    private configService;
    private httpService;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService, configService: ConfigService, httpService: HttpService);
    validateUser(email: string, password: string): Promise<User | null>;
    loginAdmin(user: User): Promise<UserLoginResponse>;
    loginUser(user: User): Promise<UserLoginResponse>;
    signUp(userSignUpInput: UserSignUpInput): Promise<UserSignUpResponse>;
    generatePasswordResetLink(userId: string): Promise<string>;
    update(userUpdateInput: UserUpdateInput): Promise<User>;
    private generateRandomPassword;
}
