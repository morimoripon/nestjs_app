import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

/* const sampleImages = [
  'https://drive.google.com/uc?id=11ZWFhLJQHFXHDEapgUJDdCGQsiOl6DtG&.png',
  'https://drive.google.com/uc?id=18hwREZvIK0HTnVgHi-zbcCJljJ05CbQ-&.png',
  'https://drive.google.com/uc?id=1QphScPbFORkulS2MILdRW_ufJeouRV2S&.png',
  'https://drive.google.com/uc?id=1hszVOcIWHlTK80543-uoW7RfTXxcTLx5&.png',
  'https://drive.google.com/uc?id=1qf7kKZ225vHyga3sC-gzUIU1s4jWoSwi&.png'
]; */

const sampleImages = [
  '/user_1.png',
  '/user_2.png',
  '/user_3.png',
  '/user_4.png',
  '/user_5.png',
]

export const genUsers = async (): Promise<Pick<User, 'email' | 'name' | 'password' | 'imageUrl'>[]> => {
  const users = await Promise.all(
    [...Array(5)]
      .map((_, i) => i + 1)
      .map(async num => ({
        email: `morimoripon.s+000${num}@gmail.com`,
        name: `ユーザー${num}`,
        password: await bcrypt.hash('password', 10),
        imageUrl: sampleImages[num - 1]
      })),
  )

  return users
}


