import { Client } from 'pg';
import MdTable from '../metadata/mdTable.class';
import MdField from '../metadata/mdField.class';
import {MdTypes} from '../metadata/mdTypes';
import {getObjectsList} from '../helpers/mdObjectHelper'
import MdDomain from '../metadata/mdDomain.class';
import MdType from '../metadata/mdType.class';
const config = require("../database/config/db.config");

export async function createProjectDataBase(){
    await createDataBaseIfNotExist(config.DB);
    await createSchemaIfNotExist(config.SCHEMA);
}

async function createSchemaIfNotExist(schemaName:string){

    const client =  new Client({
        host: config.HOST,
        port: config.PORT,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DB
      });

      const conn = await client.connect();
      await client.query('CREATE SCHEMA IF NOT EXISTS ' + schemaName);
      await client.end();
}

async function createDataBaseIfNotExist(dataBaseName:string) {
    const client =  new Client({
        host: config.HOST,
        port: config.PORT,
        user: config.USER,
        password: config.PASSWORD,
      });
   
    const conn = await client.connect();
    const dbQuery = await client.query('SELECT FROM pg_database WHERE datname = $1', [dataBaseName])
    if (dbQuery.rows.length === 0)  {
        await client.query('CREATE DATABASE ' + dataBaseName)
    }
    await client.end();
}

async function createTableIfNotExist(schemaName:string, mdTable:MdTable) {
    const client =  new Client({
        host: config.HOST,
        port: config.PORT,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DB
      });
   
    const conn = await client.connect();
    const createTableQuery =`CREATE TABLE IF NOT EXISTS ${schemaName}.${mdTable.databaseName}()`;
    await client.query(createTableQuery);
    await alterTable(client, schemaName, mdTable); 
    await client.end(); 
}

async function alterTable(client:any, schemaName:string, mdTable:MdTable) {
    const columnsQuery = `SELECT * FROM information_schema.columns  WHERE table_schema = '${schemaName}'
         AND table_name   = '${mdTable.databaseName}'`;
    const dbQuery = await client.query(columnsQuery);
    const mdFields = await getObjectsList(MdTypes.Field, mdTable.id);
    const feildMap = new Map();
    if(mdFields){
        for await (const mdField of mdFields) {
            const field = mdField as MdField;
            if(!field.isDBField || !field.databaseName) {continue};
            if(await field.haveMdType()){
                feildMap.set(field.databaseName, 'UUID');
                feildMap.set(`${field.databaseName}_md_id`, 'UUID')
            }    
            else{
                const typeDescr = await getFieldDBType(field);
                if(typeDescr){
                    feildMap.set(field.databaseName, typeDescr);
                }
            }         
        }
    }

    let queryString = `ALTER TABLE ${schemaName}.${mdTable.databaseName}\n `;
    let fieldDescr = '';
    for (let [key, value] of feildMap) {
        const index = dbQuery.rows.findIndex((item:any)=>item.column_name === key)  
        let descr = '';
        if(index<0){
            descr =`\n ADD COLUMN ${key}  ${value}`
        }
        else{
            descr =`\n ALTER COLUMN ${key} TYPE ${value}`            
        }
        fieldDescr += (fieldDescr?',':'') + `${descr}`      
    }
    
    //drop
    let dropFieldDescr = '';
    for await (const item of dbQuery.rows) {
        if(!feildMap.has(item.column_name)){
            fieldDescr += (fieldDescr?',':'') + `\n DROP COLUMN ${item.column_name}`;            
        }     
    }

    const query = queryString + fieldDescr;
    await client.query(query);
}



export async function initDomain(mdDomain:MdDomain){
    if(!mdDomain.databaseName){
        throw Error('Domain database name is empty');
    }
    await createSchemaIfNotExist(mdDomain.databaseName);       
    const mdTables = await getObjectsList(MdTypes.Table, '');
    if(!mdTables){return}
    for await (const mdTable of mdTables) {
         if((mdTable as any).isDBTable) {
             await createTableIfNotExist(mdDomain.databaseName, (mdTable as MdTable));
         }         
    }    
}

async function getFieldDBType(mdField:MdField){
    let typeDescr = '';
    const mdTypes = await mdField.getTypes();
    if(mdTypes.length>0){
        if(mdTypes[0].id === MdTypes.UUID){
            typeDescr = 'UUID'           
        }
        if(mdTypes[0].id === MdTypes.Number){
            if(mdField.fraction){
                typeDescr = `numeric(${mdField.length}, ${mdField.fraction})`;                   
            }else{
                typeDescr = 'integer';
            }       
        }
        if(mdTypes[0].id === MdTypes.Boolean){
            typeDescr = 'boolean'           
        }
        if(mdTypes[0].id === MdTypes.String){
            if(mdField.length){
                typeDescr = `varchar(${mdField.length})`;
            }else{
                typeDescr = `text`;               
            }          
        }
    }
    return typeDescr;
}

