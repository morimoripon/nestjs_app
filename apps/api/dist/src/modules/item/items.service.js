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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const image_utils_1 = require("../common/util/image.utils");
let ItemsService = class ItemsService {
    constructor(prisma, imageUtils) {
        this.prisma = prisma;
        this.imageUtils = imageUtils;
    }
    async findUnique(args) {
        return this.prisma.item.findUnique(args);
    }
    async findMany(args) {
        return this.prisma.item.findMany(args);
    }
    async getMyItems(userId) {
        return this.prisma.item.findMany({
            where: {
                userId,
            },
        });
    }
    async getItemById(id) {
        return this.prisma.item.findUnique({
            where: {
                id,
            },
        });
    }
    async getItems(data) {
        return this.prisma.item.findMany({
            where: Object.assign({}, data),
        });
    }
    async create(userId, args) {
        await this.prisma.item.create({
            data: Object.assign(Object.assign({}, args), { userId }),
        });
        return true;
    }
    async update(id, args) {
        const item = await this.prisma.item.findUnique({
            where: {
                id,
            },
        });
        if (!item) {
            return false;
        }
        await this.prisma.item.update({
            where: {
                id,
            },
            data: Object.assign({}, args),
        });
        return true;
    }
};
ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService, image_utils_1.ImageUtils])
], ItemsService);
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map