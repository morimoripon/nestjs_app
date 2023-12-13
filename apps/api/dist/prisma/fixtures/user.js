"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genUsers = void 0;
const bcrypt = require("bcrypt");
const sampleImages = [
    '/user_1.png',
    '/user_2.png',
    '/user_3.png',
    '/user_4.png',
    '/user_5.png',
];
const genUsers = async () => {
    const users = await Promise.all([...Array(5)]
        .map((_, i) => i + 1)
        .map(async (num) => ({
        email: `morimoripon.s+000${num}@gmail.com`,
        name: `ユーザー${num}`,
        password: await bcrypt.hash('password', 10),
        imageUrl: sampleImages[num - 1]
    })));
    return users;
};
exports.genUsers = genUsers;
//# sourceMappingURL=user.js.map