"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const tables = await prisma.$queryRaw `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`;
    for (const table of tables) {
        if (table.tablename === '_prisma_migrations')
            continue;
        if (table.tablename !== 'NotificationSetting')
            continue;
        console.log('👹', table);
        await prisma.$executeRawUnsafe('TRUNCATE "' + table.tablename + '" CASCADE;');
    }
}
main()
    .catch(e => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=truncate.js.map