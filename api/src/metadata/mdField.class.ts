import BaseMeta from './basemeta.class'
import MdType from './mdType.class';
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
export default class MdField extends BaseMeta{
    type:string = '';
    length:number = 0;
    fraction:number = 0;
    mask:string='';
    isDBField = false;
    unique = false;
    databaseName= '';
    constructor(id:string){ 
        super(id);

        this.typeId= '8c474f75-b63a-4f3a-b624-f9a58cb7eeae';
        this.modelName= 'md_fields';
        this.typeName = 'Field'
    }

    public async haveMdType(){
        let haveMdType = false;
        const typesArray = this.type.split(',');
        for await (const mdTypeId of typesArray) {
            const mdType = await MdType.getMdType(mdTypeId);
            if(mdType){
                haveMdType = (haveMdType || mdType.isMdType)
            }
        }
        return haveMdType;
    }

    public haveMultyType(){
        const typesArray = this.type.split(',');
        return (typesArray.length>1);       
    }

    public async getTypes(){
        const mdTypesArray:Array<MdType> = [];
        const typesArray = this.type.split(',');
        for await (const mdTypeId of typesArray) {
            const mdType = await MdType.getMdType(mdTypeId);
            if(mdType){
                mdTypesArray.push(mdType);
            }
        }   
        return  mdTypesArray;
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('type', MdTypes.None, 0, this.type, "", false, "type"));
        mdFields.push(new MdTypeField('length', MdTypes.Number, 10, this.length, 0, false, "length"));
        mdFields.push(new MdTypeField('fraction', MdTypes.Number, 10, this.fraction, 0, false, "fraction"));
        mdFields.push(new MdTypeField('mask', MdTypes.String, 150, this.mask, "", false, "mask"));
        mdFields.push(new MdTypeField('isDBField', MdTypes.Boolean, 0,this.isDBField, false, false, "is_db_field"));
        mdFields.push(new MdTypeField('databaseName', MdTypes.String, 150, this.databaseName, "", false, "database_name")); 
        mdFields.push(new MdTypeField('unique', MdTypes.Boolean, 0,this.unique, false, false, "unique"));      
        return mdFields;
    }
}