import BaseMeta from './basemeta.class'
import { MdTypes } from './MdTypes';

export default class mdUser extends BaseMeta{
    domainAdmin = false;
    configAdmin = false;
    password = '';
    constructor(id:string){
        
        super(id);
        this.typeId= MdTypes.User;
        
        this.typeName = 'MdUser'
        this.domainAdmin = false;
        this.configAdmin = false;
        this.password = '';   
    }
}