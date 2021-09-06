export default class FilterItem {
    value:any = undefined;
    comparisonType = ComparisonTypes.Equal;

    constructor(name:string, comparisonType:ComparisonTypes, value:any,) {
        this.value = value;       
    }
}

export enum ComparisonTypes{
    InList,
    Equal,
    NotEqual
}