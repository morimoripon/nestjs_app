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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const nestjs_prisma_1 = require("nestjs-prisma");
const image_utils_1 = require("../common/util/image.utils");
let UsersService = class UsersService {
    constructor(prisma, imageUtils) {
        this.prisma = prisma;
        this.imageUtils = imageUtils;
    }
    async findUnique(args) {
        return this.prisma.user.findUnique(args);
    }
    async findMany(args) {
        return this.prisma.user.findMany(args);
    }
    async adminGetUsers() {
        return this.prisma.user.findMany({
            where: {
                deletedAt: null,
            },
            include: {
                items: true,
            },
        });
    }
    async create(args) {
        let errorMessage = '';
        const user = await this.prisma.user
            .create({
            data: Object.assign({}, args.data),
        })
            .catch(e => {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    errorMessage = '既に登録されているメールアドレスです';
                    throw new Error(errorMessage);
                }
                else {
                    throw e;
                }
            }
            return null;
        });
        return {
            user,
            errorMessage,
        };
    }
    async update(args) {
        return this.prisma.user.update(args);
    }
    async delete(args) {
        return this.prisma.user.delete(args);
    }
    async generateUserImageUrl(filename, fileType) {
        return await this.imageUtils.generateImageUrl(filename, fileType, 'users');
    }
    async generateIdDocumentImageUrl(filename, fileType) {
        return await this.imageUtils.generateImageUrl(filename, fileType, 'documents');
    }
    async updatePassword(userId, password) {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    password: await bcrypt.hash(password, 10),
                },
            });
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService, image_utils_1.ImageUtils])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map