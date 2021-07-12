import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdDocumentInstance extends Model { 
    id: number;
    name: string;
  }
  export const md_catalogs = sequelize.define<mdDocumentInstance>('md_documents', {
        id:{
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        // list_name:{
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
        // synonym:{
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
        // list_synonym:{
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
    }, {
        freezeTableName: true
});   