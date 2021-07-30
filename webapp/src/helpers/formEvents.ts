import { EventEmitter } from 'events'
import FormEventArgs from './formEventsArgs'

export default class FormEvents extends EventEmitter{
    elementId = '';
    constructor(elementId:string){
        super()
        this.elementId = elementId;       
    }

    close(resultData?:any){
        const eventArgs = new FormEventArgs();
        eventArgs.elementId = this.elementId;
        eventArgs.resultData = resultData;
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