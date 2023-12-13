import { User } from '@prisma/client';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { ItemsService } from './items.service';
import { Item } from '@prisma/client';
import { GetItemInput } from './dto/get-item.input';
export declare class ItemsResolver {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    getItems(data: GetItemInput): Promise<Item[] | null>;
    getItemById(id: string): Promise<Item | null>;
    getMyItems(user: User): Promise<Item[] | null>;
    createItem(user: User, data: CreateItemInput): Promise<boolean>;
    updateItem(user: User, data: UpdateItemInput): Promise<boolean>;
}
