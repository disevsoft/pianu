import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdTypeInstance extends Model { 
    id: number;
    name: string;
  }

export const md_types = sequelize.define<mdTypeInstance>('md_types', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        list_name:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        synonym:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        list_synonym:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        table_name:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        class_name:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        is_database_type:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        database_type:{
            type: Sequelize.STRING,
            allowNull: true,
        }
    }, {
        freezeTableName: true
}); 

