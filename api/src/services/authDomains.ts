import jwt from 'jsonwebtoken';
import config from "../config/auth.config";
import ResponseArgs from '../helpers/responseArgs'
import { verifyToken } from './authJwt';




export async function authDomains(req:any, res:any, next:any) {

  // const headerDomains = req.headers["access-domains"];
  // if (!headerDomains) { 
  //   const resArgs = new ResponseArgs(res);
  //   resArgs.status = 403;
  //   resArgs.messageId = 6;
  //   return resArgs.send();
  // }

    const domains = '';
     req.domains = domains;
     next(); 
};
