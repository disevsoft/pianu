import MdTypeField from './mdTypeField.class'
import db from '../database/config/sequilize.metadata'
import {md_objects_types} from '../database/config/models/md_objects_types'
import {md_map} from '../database/config/models/md_map'
const { v4: uuidv4 } = require('uuid');
import * as mdHelper from '../helpers/mdObjectHelper'

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
            this.id = await uuidv4(); 
            let updatedFields = await this.getModelFields();

            await model.create(updatedFields,
                { transaction: t }); 
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
            await model.update(updatedFields,  
              {where:{id: this.id},  
              //returning: true, 
              });
        } 
    }

    async delete(){
        try{
            db.sequelize.transaction(async(t)=>{  
            const childObjects:any = md_map.findAll({where:{md_owner_id: this.id}})
            for (let childObject of childObjects){
                const mdObject:BaseMeta = await mdHelper.getInstanceById(childObject.md_object_id);  
                mdObject.delete();
                md_map.destroy({where:{md_owner_id: this.id, md_object_id:childObject.md_object_id}})
            } 
            await md_objects_types.destroy({where:{md_object_id: this.id}})
            const model = await require('../database/config/models/'+this.modelName)[this.modelName];
            model.destroy({where:{id: this.id}})
            });
        }catch{
            console.log('cant delete');           
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