"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const nestjs_prisma_1 = require("nestjs-prisma");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    });
    const prismaService = app.get(nestjs_prisma_1.PrismaService);
    prismaService.enableShutdownHooks(app);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map