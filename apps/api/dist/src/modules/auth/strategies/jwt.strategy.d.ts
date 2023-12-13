import { User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    private configService;
    constructor(usersService: UsersService, configService: ConfigService);
    validate(payload: {
        sub: string;
    }): Promise<User | null>;
}
export {};
