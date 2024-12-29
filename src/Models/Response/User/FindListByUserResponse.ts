import { CustomList } from 'src/Models/Entities/List/CustomListEntity';
import { Sku } from 'src/Models/Entities/Sku/SkuEntity';

export default class FindListByUserResponse {
    uuid: string;
    name: string;
    description: string;
    customListSku: Sku[];

    constructor(list: CustomList) {
        this.uuid = list.getUuid() ?? null;
        this.name = list.getName() ?? null;
        this.description = list.getDescription() ?? null;
        this.customListSku = list.getCustomListSku() ?? null;
    }
}
