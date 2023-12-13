"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genItem = void 0;
const sampleImages = [
    '/item_1.jpeg',
    '/item_2.jpeg',
    '/item_3.jpeg',
    '/item_4.jpeg',
    '/item_5.jpeg',
    '/item_6.jpeg',
    '/item_7.jpeg',
    '/item_8.jpeg',
    '/item_9.jpeg',
    '/item_10.jpeg',
    '/item_11.jpeg',
    '/item_12.jpeg',
    '/item_13.jpeg',
    '/item_14.jpeg',
    '/item_15.jpeg',
];
const genItem = (user, userNum) => {
    const items = [...Array(3)]
        .map((_, i) => i + 1)
        .map(num => ({
        name: `${user.name}の商品${num}`,
        description: `${user.name}の商品${num}です。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。`,
        amount: num * 2500,
        imageUrl: sampleImages[((userNum - 1) * 3) + (num - 1)]
    }));
    return items;
};
exports.genItem = genItem;
//# sourceMappingURL=item.js.map