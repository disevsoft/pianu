import MdDomain from '../../metadata/mdDomain.class'
import { ApiCommandArgs, ApiMain } from './api.service';
import * as MdHelper from '../../metadata/mdHelper'
import { MdTypes } from '@/metadata/MdTypes';
export default class DomainService{
   
    static async initDomain(domain:MdDomain) {
        const apiCommandArgs = new ApiCommandArgs("initDomain", {mdObjectId: domain.id})
        const data = await ApiMain.execApiCommand(apiCommandArgs); 
        return data; 
    }

    static async initDomainById(domainId:string) {       
        const domain = await MdHelper.getMdObject(MdTypes.Domains, domainId, '');
        return await DomainService.initDomain(domain as MdDomain);
    }
}