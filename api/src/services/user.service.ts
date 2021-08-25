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
    
    let item = {name: '', password: '', config_admin:true, id:''}
    if(obj){
        item = {name: config.admin, password: await getPasswordHash(config.password), config_admin:true, id:obj.id}
        await md_users.update(item, 
         { 
           where: { name: config.admin }
         })
     } else{ 
        item = {name: config.admin, password: await getPasswordHash(config.password), config_admin:true, id:await uuidv4()}
        await md_users.create(item); 
     }  

     const md_objects_types = await require('../database/config/models/' + 'md_objects_types')['md_objects_types']; 
     const objectType = await md_objects_types.findOne({ where: { md_object_id: item.id } });
     if(objectType){
        await md_objects_types.update({md_object_id:item.id, md_type_id:'60a34539-5b85-4d96-b619-cefc7b6b894b'}, 
         { 
           where: { md_object_id:item.id }
         })
     } else{ 
         await md_objects_types.create({md_object_id:item.id, md_type_id:'60a34539-5b85-4d96-b619-cefc7b6b894b'}); 
     }  
  }

  export async function getPasswordHash(password:string){
    return bcrypt.hashSync(password, 8)
  }

  export async function getUserMenuId(userId:string){
    return 'e5691804-20cf-4b13-a0a3-7338cdadccec';
  }