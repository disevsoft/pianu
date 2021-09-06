export default class FilterItem {
    value:any = undefined;
    comparisonType = ComparisonTypes.Equal;

    constructor(name:string, comparisonType:ComparisonTypes, value:any,) {
        this.value = value;       
    }

    public filterApply(obj:any, fieldName:string){
        let apply = false;
        if(this.comparisonType===ComparisonTypes.Equal){   
            apply = (obj[fieldName]===this.value);
        }

        if(this.comparisonType===ComparisonTypes.NotEqual){
            apply = (obj[fieldName]!=this.value);
        }
        return apply;
    }
}

export enum ComparisonTypes{
    InList,
    Equal,
    NotEqual
}