import { ApiCommandArgs, ApiMain } from './api.service';
import * as MdHelper from '../../metadata/mdHelper'
import { MdTypes } from '@/metadata/MdTypes';
import mdMenuItem from '@/metadata/mdMenuItem.class';
export default class MenuService{

    static _mainMenu: mdMenuItem;

    public static async getRootMainMenu() {
        const apiCommandArgs = new ApiCommandArgs("getUserMenu", {})
        const data = await ApiMain.execApiCommand(apiCommandArgs); 
        await MenuService.createMenuTree(data);
        return MenuService._mainMenu.children; 
    }
    
    static async createMenuTree(data:Array<any>){
        const menuRoot = data.find(elem=>elem.parentId==='');        
        MenuService._mainMenu = await  MdHelper.getMdObject(MdTypes.MenuItem, menuRoot.id, '') as mdMenuItem;
        await MenuService.getChildrenMenuItems(MenuService._mainMenu)
    }
    
    static async getChildrenMenuItems(parentMenuItem:mdMenuItem){
        const childMenuItems = await MdHelper.getMdObjects(MdTypes.MenuItem, parentMenuItem.id);
        parentMenuItem.children = childMenuItems as mdMenuItem[];
        for await (const menuItem of parentMenuItem.children) {
            MenuService.getChildrenMenuItems(menuItem);              
        }
    }
}