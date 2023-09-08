import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

export const genUsers = async (): Promise<Pick<User, 'email' | 'name' | 'password'>[]> => {
  const users = await Promise.all(
    [...Array(5)]
      .map((_, i) => i + 1)
      .map(async num => ({
        email: `morimoripon.s+000${num}@gmail.com`,
        name: `ユーザー${num}`,
        password: await bcrypt.hash('password', 10),
      })),
  )

  return users
}
