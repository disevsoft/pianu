import MdTypeField from './mdTypeField.class'
import db from '../database/config/sequilize.metadata'
import {md_objects_types} from '../database/config/models/md_objects_types'
import {md_map} from '../database/config/models/md_map'
const { v4: uuidv4 } = require('uuid');

export default class BaseMeta{
    private mdId: string = '';
    mdFields:Array<MdTypeField> = [];
    typeId:string = '';
    modelName:string='';
    typeName:string = '';
    name:string = '';
    synonym:string = '';
    parentId:string = '';
    constructor(id:string){
        this.mdFields.push(new MdTypeField('id', "UUID", "", id, true, 'id'));
        this.mdFields.push(new MdTypeField('name', "char(150)", "", "", false, "name"));
        this.mdFields.push(new MdTypeField('synonym', "char(150)", "", "", false, "synonym"));
        this.mdFields.push(new MdTypeField('parentId', "char(150)", "", "", true, ""));
        this.id = id;
    }
    public static mdObjects: Array<BaseMeta> =[];
   
    public set id(value : string) {
        this.mdId = value;
        var idFieldIndex = this.mdFields.findIndex(elem=>(elem.name ==='id'));
        if(idFieldIndex >= 0){ 
            this.mdFields[idFieldIndex].value = this.mdId;
        }
    };

    public get id() { 
        return this.mdId;  
    };

    async save() {  
        const model = await require('../database/config/models/'+this.modelName)[this.modelName];
        if(!model){return;}

        if(!this.id){ 
            const t = await db.sequelize.transaction();
            this.id = uuidv4(); 
            let updatedFields = await this.getModelFields();

            const newData = await model.create(updatedFields,
                { transaction: t }); 
            console.log(newData);
            
            await md_objects_types.create({
                md_object_id: this.id, 
                md_type_id: this.typeId}, { transaction: t, returning: false })
            if(this.parentId){
                await md_map.create({
                    md_object_id: this.id, 
                    md_owner_id: this.parentId}, { transaction: t })    
            }
           await t.commit();  
        }else{
            let updatedFields = await this.getModelFields();
            const dataObject = await model.update(updatedFields,  
              {where:{id: this.id}, 
              //returning: true, 
              });
        } 
    }

    async getModelFields(){
        const updatedFields:any = {};
        for (let field of this.mdFields){ 
            if(field.fieldMap){
                updatedFields[field.fieldMap]=field.value; 
             } 
        }
        return updatedFields;
      }   
}