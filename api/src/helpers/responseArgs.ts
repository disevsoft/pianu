import express, { Request, response, Response } from "express";
import * as Messages from '../apiMessages/messages';
export default class ResponseArgs{
    cancel:Boolean = false;
    res:Response;
    status:number=200;
    messageId:number=0;
    resData:any = null;
    sendJson = true;
    errorDescription = '';
    constructor(res:Response){
        this.res = res;
    }
    public get message(){
        return Messages.getMessage(this.messageId) + (this.errorDescription===''? '':' ') 
            + this.errorDescription;
    }

    public async send(){
        const addInfo = {message:this.message}
        const data = {data: this.resData, info:addInfo}
        if(this.cancel){
            this.res.status(this.status).json(data);
        }
        else{
            if (this.sendJson){
                this.res.status(200).json(data);   
            }
            else{
                this.res.status(200).send(data);   
            }
        }
    }
}

