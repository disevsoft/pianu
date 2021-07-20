import jwt from 'jsonwebtoken';
import config from "../config/auth.config";
import ResponseArgs from '../helpers/responseArgs'

export async function verifyToken(req:any, res:any, next:any) {
  next();
  // let token = req.headers["x-access-token"];
  // if (!token) { 
  //   const resArgs = new ResponseArgs(res);
  //   resArgs.status = 403;
  //   resArgs.messageId = 6;
  //   return resArgs.send();
  // }

  //   try {
  //    var decoded:any = jwt.verify(token, config.secret);
  //    req.userId = decoded.id;
  //    next(); 
  //   } catch(err) {
  //       const resArgs = new ResponseArgs(res);
  //       resArgs.status = 401;
  //       resArgs.messageId = 7;
  //       return resArgs.send(); 
  //     }
};
