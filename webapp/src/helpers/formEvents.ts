import { EventEmitter } from 'events'
import FormEventArgs from './formEventsArgs'

export default class FormEvents extends EventEmitter{
    elementId = '';
    constructor(elementId:string){
        super()
        this.elementId = elementId;       
    }

    close(resultData?:any, senderName?:string, cancel?:boolean){
        const eventArgs = new FormEventArgs();
        eventArgs.elementId = this.elementId;
        eventArgs.resultData = resultData;
        eventArgs.senderName = senderName;
        if(cancel != undefined){
            eventArgs.cancel = cancel;
        }
        this.emit('beforeClose', eventArgs)
        if(!eventArgs.cancel){
            this.emit('onClose', eventArgs)
        }
        if(!eventArgs.cancel){
            this.emit('afterClose', eventArgs)
        }
        return eventArgs;
    }
}