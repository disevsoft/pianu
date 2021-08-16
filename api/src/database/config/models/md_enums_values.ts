import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdEnumValueInstance extends Model { 
    id: string;
    name: string;
  }

  export const md_enums_values = sequelize.define<mdEnumValueInstance>('md_enums_values', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        enum_id:{
            type: Sequelize.UUID,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false, 
        },
        synonym:{
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, 
      db.sequilizeOptions
);   
    
