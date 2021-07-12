import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdObjectTypesInstance extends Model { 
    id: number;
    name: string;
  }

  export const md_objects_types = sequelize.define<mdObjectTypesInstance>('md_objects_types', {
            md_object_id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        md_type_id:{
            type: Sequelize.UUID,
            //primaryKey: true,
            allowNull: false,
            unique: false
        },
       
    }, {
        freezeTableName: true
}); 
     
