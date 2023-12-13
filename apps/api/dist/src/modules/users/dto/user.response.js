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
exports.UserResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const get_item_response_1 = require("../../item/dto/get-item.response");
let UserResponse = class UserResponse {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponse.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserResponse.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [get_item_response_1.GetItemResponse], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "items", void 0);
UserResponse = __decorate([
    (0, graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;
//# sourceMappingURL=user.response.js.map