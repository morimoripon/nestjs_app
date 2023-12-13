import { User } from '@prisma/client';
export declare const genUsers: () => Promise<Pick<User, 'email' | 'name' | 'password' | 'imageUrl'>[]>;
