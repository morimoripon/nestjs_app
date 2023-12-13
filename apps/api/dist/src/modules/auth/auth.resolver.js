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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const current_user_response_1 = require("./dto/current-user.response");
const user_login_input_1 = require("./dto/user-login.input");
const user_login_response_1 = require("./dto/user-login.response");
const user_signup_input_1 = require("./dto/user-signup.input");
const user_signup_response_1 = require("./dto/user-signup.response");
const user_update_input_1 = require("./dto/user-update.input");
const gql_auth_guard_1 = require("./guards/gql-auth.guard");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
let AuthResolver = class AuthResolver {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async loginUser(userLoginInput, context) {
        return this.authService.loginUser(context.user);
    }
    async loginAdmin(userLoginInput, context) {
        return this.authService.loginAdmin(context.user);
    }
    async getCurrentUser(user) {
        return user;
    }
    async signUpUser(userSignUpInput) {
        return this.authService.signUp(userSignUpInput);
    }
    async updateAuth(userUpdateInput) {
        return this.authService.update(userUpdateInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => user_login_response_1.UserLoginResponse),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_input_1.UserLoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "loginUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_login_response_1.UserLoginResponse),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_input_1.UserLoginInput, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "loginAdmin", null);
__decorate([
    (0, graphql_1.Query)(() => current_user_response_1.CurrentUserResponse, { name: 'currentUser' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getCurrentUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_signup_response_1.UserSignUpResponse),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_signup_input_1.UserSignUpInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUpUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_input_1.UserUpdateInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "updateAuth", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, users_service_1.UsersService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map