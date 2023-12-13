"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const nestjs_prisma_1 = require("nestjs-prisma");
const image_utils_1 = require("../src/modules/common/util/image.utils");
const users_service_1 = require("../src/modules/users/users.service");
const item_1 = require("./fixtures/item");
const user_1 = require("./fixtures/user");
const items_service_1 = require("../src/modules/item/items.service");
const prisma = new client_1.PrismaClient();
const main = async () => {
    console.log('💫 seed executing ...');
    const prismaService = new nestjs_prisma_1.PrismaService();
    const configService = new config_1.ConfigService();
    const imageUtils = new image_utils_1.ImageUtils(configService);
    const usersService = new users_service_1.UsersService(prismaService, imageUtils);
    const itemsService = new items_service_1.ItemsService(prismaService, imageUtils);
    const users = await (0, user_1.genUsers)();
    const userDatas = await Promise.all(users.map(user => usersService.create({
        data: user,
    })));
    await Promise.all(userDatas.map((userData, index) => {
        if (userData.errorMessage) {
            console.log(userData.errorMessage);
            return null;
        }
        const items = (0, item_1.genItem)(userData.user, index + 1);
        return items.map(item => itemsService.create(userData.user.id, item));
    }));
    console.log('💫 seed finished.');
};
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map