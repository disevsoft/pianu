import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdMenuItemInstance extends Model { 
    id: string;
    name: string;
  }
  export const md_menu_items = sequelize.define<mdMenuItemInstance>('md_menu_items', {
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
        object_id:{
            type: Sequelize.UUID,
            allowNull: true,
        },
    }, db.sequilizeOptions);   