import jwt from 'jsonwebtoken';
import config from "../config/auth.config.js";
//import db from "../models";
//const User = db.user;

export async function verifyToken(req:any, res:any, next:any) {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

    try {
     var decoded:any = jwt.verify(token, config.secret);
     req.userId = decoded.id;

    } catch(err) {
        return res.status(401).send({
             message: "Unauthorized!"});
        }
};
