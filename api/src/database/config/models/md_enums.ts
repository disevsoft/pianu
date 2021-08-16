import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdEnumInstance extends Model { 
    id: string;
    name: string;
  }

  export const md_enums = sequelize.define<mdEnumInstance>('md_enums', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
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
    
