import { Item, User } from '@prisma/client'

/* const sampleImages = [
  'https://drive.google.com/uc?id=1-UbQnBnBoGsrWp6vReXOrDunRTYC7G8j&.jpeg',
  'https://drive.google.com/uc?id=15JjHZo7zDt6czt1GcjBeiMhxUw_UPGSf&.jpeg',
  'https://drive.google.com/uc?id=15zxafjLWAVEf5z12Q0y-_0VEPx58z3EN&.jpeg',
  'https://drive.google.com/uc?id=19i2vFced1z0EqoUP80njzb6mKb1gPE5s&.jpeg',
  'https://drive.google.com/uc?id=1BEx5oN5kRBMBZuoEnO3VPaBK3g4Sb7No&.jpeg',
  'https://drive.google.com/uc?id=1BScmt0Q8eMMuGyGO5yEo7c6tC15KTzOv&.jpeg',
  'https://drive.google.com/uc?id=1KqT3qj7vwK6iKe8U3NjDW56n9n7n9vwM&.jpeg',
  'https://drive.google.com/uc?id=1LfDkwQoM0BLVyYS2Han07YpgKD6-za3F&.jpeg',
  'https://drive.google.com/uc?id=1Nr00eNuODGWf4tfvegkIgjJVzFmLUNOx&.jpeg',
  'https://drive.google.com/uc?id=1UjQsSocIblnjBTRBsBH7960v8qAqgzou&.jpeg',
  'https://drive.google.com/uc?id=1baJWN1XTHCFvAVSuYtRq9zt8s-EsAYpw&.jpeg',
  'https://drive.google.com/uc?id=1n8A4MRVHG8TCLXSf7ioFr_kjKirZfnRU&.jpeg',
  'https://drive.google.com/uc?id=1sZX50X157QmrxhL6pfub98CVNjEGhwfD&.jpeg',
  'https://drive.google.com/uc?id=1vccex_4FXSuv_gE8ZStwjsOpDIbZImp7&.jpeg',
  'https://drive.google.com/uc?id=1x4FUjErNseY9Gf7LxgL8eHb53NLtatqa&.jpeg'
] */
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
]

export const genItem = (
  user: User,
  userNum: number
): any[] => {
  const items = [...Array(3)]
    .map((_, i) => i + 1)
    .map(num => ({
      name: `${user.name}の商品${num}`,
      description: `${user.name}の商品${num}です。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。商品詳細が入ります。`,
      amount: num * 2500,
      imageUrl: sampleImages[((userNum - 1) * 3) + (num - 1)]
    }));
  return items;
}
