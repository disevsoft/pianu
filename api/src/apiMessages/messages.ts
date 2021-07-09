export function getMessage(messageId:number){
    
    return msgs[messageId];
}

type msgOptions = {
    [key: number]: string
}
const msgs: msgOptions ={
    1:'type not defined'
}