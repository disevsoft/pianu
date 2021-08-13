export function getMessage(messageId:number){
    
    return msgs[messageId];
}

type msgOptions = {
    [key: number]: string
}
const msgs: msgOptions ={
    0:'',
    1:'type not defined',
    2:'model updated succesfully',
    3:'error on model updating',
    4:'error on delete mdObject',
    5:'object deleted succesfully',
    6:'No token provided',
    7:'Unauthorized',
    8:'domain not found',
    9:'cant init domain'
}