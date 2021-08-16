import  db  from '../sequilize.metadata'
import  {Model} from "sequelize";
import * as Sequelize from 'sequelize'
const sequelize = db.sequelize;

interface mdDocumentInstance extends Model { 
    id: string;
    name: string;
  }
  export const md_documents = sequelize.define<mdDocumentInstance>('md_documents', {
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
        // list_name:{
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
        
        // list_synonym:{
        //     type: Sequelize.STRING,
        //     allowNull: true,
        // },
    }, db.sequilizeOptions);   