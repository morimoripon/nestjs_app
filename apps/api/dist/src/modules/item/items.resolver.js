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
exports.ItemsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_item_input_1 = require("./dto/create-item.input");
const get_item_response_1 = require("./dto/get-item.response");
const update_item_input_1 = require("./dto/update-item.input");
const items_service_1 = require("./items.service");
const get_item_input_1 = require("./dto/get-item.input");
let ItemsResolver = class ItemsResolver {
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    async getItems(data) {
        console.log(data);
        return this.itemsService.getItems(data);
    }
    async getItemById(id) {
        return this.itemsService.getItemById(id);
    }
    async getMyItems(user) {
        return this.itemsService.getMyItems(user.id);
    }
    async createItem(user, data) {
        return this.itemsService.create(user.id, data);
    }
    async updateItem(user, data) {
        return this.itemsService.update(user.id, data);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [get_item_response_1.GetItemResponse]),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_item_input_1.GetItemInput]),
    __metadata("design:returntype", Promise)
], ItemsResolver.prototype, "getItems", null);
__decorate([
    (0, graphql_1.Query)(() => get_item_response_1.GetItemResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsResolver.prototype, "getItemById", null);
__decorate([
    (0, graphql_1.Query)(() => [get_item_response_1.GetItemResponse]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItemsResolver.prototype, "getMyItems", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_item_input_1.CreateItemInput]),
    __metadata("design:returntype", Promise)
], ItemsResolver.prototype, "createItem", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_item_input_1.UpdateItemInput]),
    __metadata("design:returntype", Promise)
], ItemsResolver.prototype, "updateItem", null);
ItemsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsResolver);
exports.ItemsResolver = ItemsResolver;
//# sourceMappingURL=items.resolver.js.map