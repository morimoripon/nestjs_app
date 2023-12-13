"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const nestjs_prisma_1 = require("nestjs-prisma");
const uuid_1 = require("uuid");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, prisma, configService, httpService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.configService = configService;
        this.httpService = httpService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findUnique({
            where: { email: email },
        });
        if (user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }
    async loginAdmin(user) {
        const payload = {
            'https://hasura.io/jwt/claims': {
                'x-hasura-allowed-roles': ['admin', 'user'],
                'x-hasura-default-role': 'admin',
                'x-hasura-user-id': user.id,
                'x-hasura-role': 'admin',
            },
            sub: user.id,
            iat: Date.now() / 1000,
        };
        return {
            jwtToken: this.jwtService.sign(payload, {
                expiresIn: '30d',
            }),
        };
    }
    async loginUser(user) {
        const payload = {
            'https://hasura.io/jwt/claims': {
                'x-hasura-allowed-roles': ['admin', 'user'],
                'x-hasura-default-role': 'user',
                'x-hasura-user-id': user.id,
                'x-hasura-role': 'user',
            },
            sub: user.id,
            iat: Date.now() / 1000,
        };
        return {
            jwtToken: this.jwtService.sign(payload, {
                expiresIn: '30d',
            }),
        };
    }
    async signUp(userSignUpInput) {
        userSignUpInput.password = await bcrypt.hash(userSignUpInput.password, 10);
        const { user, errorMessage } = await this.usersService.create({ data: userSignUpInput });
        if (!!errorMessage) {
            return { jwtToken: '', errorMessage: errorMessage };
        }
        const payload = {
            'https://hasura.io/jwt/claims': {
                'x-hasura-allowed-roles': ['admin', 'user'],
                'x-hasura-default-role': 'user',
                'x-hasura-user-id': user.id,
                'x-hasura-role': 'user',
            },
            sub: user.id,
            iat: Date.now() / 1000,
        };
        return {
            userId: user.id,
            jwtToken: this.jwtService.sign(payload, {
                expiresIn: '30d',
            }),
            errorMessage: '',
        };
    }
    async generatePasswordResetLink(userId) {
        const resetToken = (0, uuid_1.v4)();
        await this.usersService.update({
            where: { id: userId },
            data: {
                resetToken,
            },
        });
        const resetPasswordLink = `${this.configService.get('WEB_URL')}/change_password?user_id=${userId}&reset_token=${resetToken}`;
        return resetPasswordLink;
    }
    async update(userUpdateInput) {
        const args = { data: userUpdateInput, where: {} };
        return args.data.password
            ? this.prisma.user.update({
                where: args.where,
                data: Object.assign(Object.assign({}, args.data), { password: await bcrypt.hash(args.data.password, 10) }),
            })
            : this.prisma.user.update({
                where: args.where,
                data: Object.assign({}, args.data),
            });
    }
    generateRandomPassword(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        nestjs_prisma_1.PrismaService,
        config_1.ConfigService,
        axios_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map