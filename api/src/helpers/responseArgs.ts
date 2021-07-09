import express, { Request, response, Response } from "express";
import * as Messages from '../apiMessages/messages';
export default class ResponseArgs{
    cancel:Boolean = false;
    res:Response;
    status:number=200;
    messageId:number=0;
    resData:any = null;
    sendJson = true;
    constructor(res:Response){
        this.res = res;
    }
    public get message(){
        return Messages.getMessage(this.messageId);
    }

    public send(){
        if(this.cancel){
            this.res.status(this.status).send(this.message);
        }
        else{
            if (this.sendJson){
                this.res.status(200).json(this.resData);   
            }
            else{
                this.res.status(200).send(this.resData);   
            }
        }
    }
}

