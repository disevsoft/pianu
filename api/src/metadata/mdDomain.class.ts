import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
import {createDataBaseIfNotExist} from '../database/dataBaseUtils'
import MdType from './mdType.class';
import {getObjectsList} from '../helpers/mdObjectHelper'
export default class MdDomain extends BaseMeta{
    databaseName = '';
    constructor(id:string){
        
        super(id);

        this.typeId= '1ba5d068-38a7-44e5-82b8-d51e680a6cb1';
        this.modelName= 'md_domains';
        this.typeName = 'Domain'
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('listName', MdTypes.String, 150, "", "", false, "list_name"));
        mdFields.push(new MdTypeField('databaseName', MdTypes.String, 150, '', "", false,'database_name'));
        
        return mdFields;
    }

    public async init() {
        if(!this.databaseName){
            throw Error('Domain database name is empty');
        }
       await createDataBaseIfNotExist(this.databaseName);
       
    //    const mdTables = await getObjectsList(MdTypes.Table, '');
    //    if(!mdTables){return}
    //    for await (const mdTable of mdTables) {
    //         if((mdTable as any).isDBTable) {
    //             await createDataBaseIfNotExist((mdTable as any).databaseName);
    //         }         
    //    }      
    }
}