import { User } from '@prisma/client';
import { CreateOneUserArgs, DeleteOneUserArgs, FindManyUserArgs, UpdateOneUserArgs, UserFindUniqueArgs } from '@prisma/client/generator-build';
import { PrismaService } from 'nestjs-prisma';
import { ImageUtils } from '../common/util/image.utils';
export declare class UsersService {
    private readonly prisma;
    private readonly imageUtils;
    constructor(prisma: PrismaService, imageUtils: ImageUtils);
    findUnique(args: UserFindUniqueArgs): Promise<User | null>;
    findMany(args: FindManyUserArgs): Promise<User[] | null>;
    adminGetUsers(): Promise<User[]>;
    create(args: CreateOneUserArgs): Promise<{
        user: User;
        errorMessage: string;
    }>;
    update(args: UpdateOneUserArgs): Promise<User>;
    delete(args: DeleteOneUserArgs): Promise<User>;
    generateUserImageUrl(filename: string, fileType: string): Promise<string>;
    generateIdDocumentImageUrl(filename: string, fileType: string): Promise<string>;
    updatePassword(userId: string, password: string): Promise<boolean>;
}
