import { MdTypes } from "@/metadata/MdTypes";
import { DataApi, DataApiCommandArgs } from "@/services/app/data.service";

export async function getListDataForView(mdType:MdTypes, objectId:string) {
    const apiCommandArgs = new DataApiCommandArgs("getListDataForView", {mdTypeId: mdType, objectId: objectId})
    const data = await DataApi.run(apiCommandArgs); 
    return data;    
}

export async function getDomainUsers(domainId:string) {
    const apiCommandArgs = new DataApiCommandArgs("getDomainUsers", {domainId: domainId})
    const data = await DataApi.run(apiCommandArgs); 
    return data;    
}