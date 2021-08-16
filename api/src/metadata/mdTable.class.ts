import BaseMeta from './basemeta.class'
import MdTypeField from './mdTypeField.class'
import {MdTypes} from './mdTypes'
import  * as mdHelper from '../helpers/mdObjectHelper';
import SaveMdObjectArgs from '../helpers/saveMdObjectArgs'
import MdField from './mdField.class'
export default class MdTable extends BaseMeta{
    isDBTable = false;
    databaseName= '';
    tableNumber = 0;
    constructor(id:string){
        
        super(id);

        this.typeId= '0cf72dda-2547-4333-aec0-c852d2f3f235';
        this.modelName= 'md_tables';
        this.typeName = 'Table';
    }

    public get mdFields(){
        let mdFields = super.mdFields;
        mdFields.push(new MdTypeField('listName', MdTypes.String, 150, "", "", false, "list_name"));
        mdFields.push(new MdTypeField('tableNumber', MdTypes.Number, 2, this.tableNumber, 0, false, "table_number")); 
        mdFields.push(new MdTypeField('isDBTable', MdTypes.Boolean, 0,this.isDBTable, false, false, "is_db_table"));
        mdFields.push(new MdTypeField('databaseName', MdTypes.String, 150, this.databaseName, "", false, "database_name")); 
        return mdFields;
    }

    async beforeSave(saveMdObjectArgs:SaveMdObjectArgs){
        await super.beforeSave(saveMdObjectArgs);
        if(!this.id && this.parentId){
            const objectTables = await mdHelper.getObjectsList(MdTypes.Table, this.parentId); 
            if(objectTables){       
                this.tableNumber = objectTables.length;  
            } 
        }
    }

    async afterSave(){
        await super.afterSave();
        this.createStandartFields();
    }
    async createStandartFields(){ 
        const fields = await mdHelper.getObjectsList(MdTypes.Field, this.id); 
        const idFieldIndex = fields?.findIndex(field=>field.name==='id');
        if(!idFieldIndex || idFieldIndex<0){
            await this.createIdField(this.tableNumber===0);    
        }
        if(this.tableNumber>0){
            const rowIdFieldIndex = fields?.findIndex(field=>field.name==='row_number');
            if(!rowIdFieldIndex || rowIdFieldIndex<0){
                await this.createRowNumberField();    
            }
        }
    }
    async createIdField(unique:boolean){
        const idField = new MdField('');
        idField.name = 'id';
        idField.type=MdTypes.UUID;
        idField.synonym = 'Object identificator';
        idField.unique = unique;
        idField.databaseName = 'id';
        idField.setParentId(this.id);
        await idField.save();
    }

    async createRowNumberField(){
        const rowNumberField = new MdField('');
        rowNumberField.name = 'row_number';
        rowNumberField.type=MdTypes.Number;
        rowNumberField.synonym = 'row number';
        rowNumberField.unique = false;
        rowNumberField.databaseName = 'row_number';
        rowNumberField.setParentId(this.id);
        await rowNumberField.save();
    }
}