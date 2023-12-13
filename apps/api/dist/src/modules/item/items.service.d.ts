import { Item } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ImageUtils } from '../common/util/image.utils';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { GetItemInput } from './dto/get-item.input';
export declare class ItemsService {
    private readonly prisma;
    private readonly imageUtils;
    constructor(prisma: PrismaService, imageUtils: ImageUtils);
    findUnique(args: any): Promise<Item | null>;
    findMany(args: any): Promise<Item[] | null>;
    getMyItems(userId: string): Promise<Item[] | null>;
    getItemById(id: string): Promise<Item | null>;
    getItems(data: GetItemInput): Promise<Item[] | null>;
    create(userId: string, args: CreateItemInput): Promise<boolean>;
    update(id: string, args: UpdateItemInput): Promise<boolean>;
}
