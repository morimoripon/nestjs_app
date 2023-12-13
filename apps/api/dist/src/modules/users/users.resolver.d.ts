import { User } from '@prisma/client';
import { GenerateImageUrlInput } from '../common/util/generate-image-url.input';
import { UpdateUserPasswordInput } from './dto/update-user-password.input';
import { UserResponse } from './dto/user.response';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    users(): Promise<UserResponse[]>;
    generateUserImageUrl(generateImageUrlInput: GenerateImageUrlInput): Promise<string>;
    generateIdDocumentImageUrl(generateImageUrlInput: GenerateImageUrlInput): Promise<string>;
    userUpdatePassword(user: User, data: UpdateUserPasswordInput): Promise<boolean>;
}
