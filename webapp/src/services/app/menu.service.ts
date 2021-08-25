
import { ApiCommandArgs, ApiMain } from './api.service';
import * as MdHelper from '../../metadata/mdHelper'
import { MdTypes } from '@/metadata/MdTypes';
export default class MenuService{
  
    public static async getUserMenu() {
        const apiCommandArgs = new ApiCommandArgs("getUserMenu", {})
        const data = await ApiMain.execApiCommand(apiCommandArgs); 
        return data; 
    }
    
    
}