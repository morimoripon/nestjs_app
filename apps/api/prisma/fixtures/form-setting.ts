import { FormSetting, User } from '@prisma/client'

export const genFormSettings = (
  user: User,
): Pick<FormSetting, 'companyName' | 'userName' | 'userId' | 'phoneNumber' | 'description'> => ({
  companyName: '株式会社テスト',
  userName: user.name,
  userId: user.id,
  phoneNumber: '090-1234-5678',
  description: 'テストです\n2行目',
})
