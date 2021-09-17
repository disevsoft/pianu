import { MdTypes } from "@/metadata/MdTypes";
import {getListDataForView} from '../helpers/dataApiHelper'
export default class BaseData {
    mdType = MdTypes.None;
    id = '';
    constructor(mdType:MdTypes, id:string) {
        this.mdType = mdType;
        this.id = id;          
    }

    async getListDataForView(){
        return await getListDataForView(this.mdType, this.id)       
    }
}