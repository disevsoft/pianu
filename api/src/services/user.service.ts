import {md_users} from '../database/config/models/md_users'
import config from '../config/auth.config'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { v4: uuidv4 } = require('uuid');

class UserData{
    name:string='';
    domains=[];
    token = '';
    constructor(name:string, token:string){
        this.name = name;
        this.token = token;
    }
}

export async function processCommand(req:any, res:any)
 {
    const body = req.body;
    const username = body.username;
    const pwd = body.password;
    const userData = await getUser(username, pwd);
    if(userData){
        res.status(200).json(userData)
    }else{
        res.status(401).send({ message: "User Not found or invalid password" });
    }
 }


 async function getUser(username:string, pwd:string) {
    const user = await md_users.findOne({ where: { name: username }}); 
    if(!user) {
        return undefined;
    }
    var passwordIsValid = await bcrypt.compare(
        pwd,
        user.password
      );

    if (!passwordIsValid) {
        return undefined;
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.tokenLife // 24 hours
      });
     
     const userData = new UserData(user.name, token);
     return userData;
}

export async function createDefaultUser(){
    const md_users = await require('../database/config/models/' + 'md_users')['md_users']; 
    const obj = await md_users.findOne({ where: { name: config.admin } });
    const item = {name: config.admin, password: await getPasswordHash(config.password), config_admin:true, id:await uuidv4()}
    if(obj){
        await md_users.update(item, 
         { 
           where: { name: config.admin }
         })
     } else{ 
         await md_users.create(item); 
     }  
  }

  export async function getPasswordHash(password:string){
    return bcrypt.hashSync(password, 8)
  }