import MdTypeField from './mdTypeField.class'
import db from '../database/config/sequilize.metadata'
import {md_objects_types} from '../database/config/models/md_objects_types'
import {md_map} from '../database/config/models/md_map'
const { v4: uuidv4 } = require('uuid');
import * as mdHelper from '../helpers/mdObjectHelper'
import SaveMdObjectArgs from '../helpers/saveMdObjectArgs'
import {MdTypes} from './mdTypes'

export default class BaseMeta{
    id: string = '';
    
    typeId:string = '';
    modelName:string='';
    typeName:string = '';
    name:string = '';
    synonym:string = '';
    parentId:string = '';
    constructor(id:string){ 
        this.id = id;
    }
    public static mdObjects: Array<BaseMeta> =[];
   
    public get mdFields(){
        let mdFields:Array<MdTypeField> = [];
        mdFields.push(new MdTypeField('id', MdTypes.UUID, 0, "", this.id, true, 'id'));
        mdFields.push(new MdTypeField('name', MdTypes.String, 150, "", "", false, "name"));
        mdFields.push(new MdTypeField('synonym', MdTypes.String, 150, "", "", false, "synonym"));
        mdFields.push(new MdTypeField('parentId', MdTypes.String, 150, this.parentId, "", true, ""));
        mdFields.push(new MdTypeField('typeId', MdTypes.UUID, 0, this.typeId, "", true,''));
        return mdFields;
    }

    public async getFields(){
        const fields = this.mdFields;
        for await (let mdField of fields) {
            if(mdField.fieldMap && mdField.sendValueToClient){
                mdField.value = (<any>this)[mdField.name];
                }
            }
        return fields;
    }

    async setParentId(parentId:string){ 
        if(!parentId){this.parentId = ''}
        else{
            this.parentId = parentId;  
        } 
    }
    async beforeSave(saveMdObjectArgs: SaveMdObjectArgs){

    };


    async afterSave(){

    };
    async save() {  
        const model = await require('../database/config/models/'+this.modelName)[this.modelName];
        if(!model){return;}
       
        await db.sequelize.transaction(async(t)=>{
            const saveMdObjectArgs = new SaveMdObjectArgs();
            await this.beforeSave(saveMdObjectArgs);
            if(saveMdObjectArgs.cancel){
                return;
            }
            if(!this.id){  
                this.id = await uuidv4(); 
                let updatedFields = await this.getModelFields();

                await model.create(updatedFields,
                ); 
                await md_objects_types.create({
                    md_object_id: this.id, 
                    md_type_id: this.typeId}, {returning: false })
                if(this.parentId){
                    await md_map.create({
                        md_object_id: this.id, 
                        md_owner_id: this.parentId},)    
                } 
            }else{
                let updatedFields = await this.getModelFields();
                await model.update(updatedFields,  
                {where:{id: this.id},  
                //returning: true, 
                },);
            }
            await this.afterSave();
        });
    }

    async delete(){
        await db.sequelize.transaction(async(t)=>{  
        const childObjects:any = await md_map.findAll({where:{md_owner_id: this.id}})
        for (let childObject of childObjects){
            const mdObject:BaseMeta = await mdHelper.getInstanceById(childObject.md_object_id);  
            if(mdObject){
                await mdObject.delete();
            }
            await md_map.destroy({where:{md_owner_id: this.id, md_object_id:childObject.md_object_id}})
        } 
        await md_objects_types.destroy({where:{md_object_id: this.id}})
        const model = await require('../database/config/models/'+this.modelName)[this.modelName];
        await model.destroy({where:{id: this.id}})
        BaseMeta.mdObjects = []; 
        });
    }

    async getModelFields(){
        const updatedFields:any = {};
        const obj:any = this;
        for (let field of this.mdFields){ 
            if(field.fieldMap){
                updatedFields[field.fieldMap]=obj[field.name]; 
             } 
        }
        return updatedFields;
      }   
}