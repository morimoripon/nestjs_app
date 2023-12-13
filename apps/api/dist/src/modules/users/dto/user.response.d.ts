import { GetItemResponse } from '@api/src/modules/item/dto/get-item.response';
export declare class UserResponse {
    id: string;
    name?: string;
    items?: GetItemResponse[];
}
