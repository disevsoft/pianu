import { Client } from 'pg';
import MdTable from '../metadata/mdTable.class';
const config = require("../database/config/db.config");

export async function createConfigDataBase(){
    createDataBaseIfNotExist('config')
}

export async function createDataBaseIfNotExist(dataBaseName:string) {
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

export async function createTableIfNotExist(dataBaseName:string, mdTable:MdTable) {
    const client =  new Client({
        host: config.HOST,
        port: config.PORT,
        user: config.USER,
        password: config.PASSWORD,
        database: dataBaseName
      });
   
    const conn = await client.connect();
    const dbQuery = await client.query('SELECT FROM pg_database WHERE datname = $1', [dataBaseName])
    if (dbQuery.rows.length === 0)  {
        await client.query('CREATE DATABASE ' + dataBaseName)
    }
    await client.end();
}
