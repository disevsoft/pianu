export default class UserRights{
    static async canReadObject (mdObjectId:string, userId:string) {
        return true;
    }
}