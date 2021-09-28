import MdDomain from '../../metadata/mdDomain.class'
import { MdApiCommandArgs, MdApi } from './api.service';
import * as MdHelper from '../../metadata/mdHelper'
import { MdTypes } from '@/metadata/MdTypes';
import * as DataHelper from '../../helpers/dataApiHelper'
export default class DomainService{
   
    static async initDomain(domain:MdDomain) {
        const apiCommandArgs = new MdApiCommandArgs("initDomain", {mdObjectId: domain.id})
        const data = await MdApi.execApiCommand(apiCommandArgs); 
        return data; 
    }

    static async initDomainById(domainId:string) {       
        const domain = await MdHelper.getMdObject(MdTypes.Domains, domainId, '');
        return await DomainService.initDomain(domain as MdDomain);
    }
    static async getDomainUsers(domainId:string){
        return DataHelper.getDomainUsers(domainId);
    }
    static async saveDomainUsers(domainId:string, domainUsers:any){
        return DataHelper.saveDomainUsers(domainId, domainUsers);
    }
}