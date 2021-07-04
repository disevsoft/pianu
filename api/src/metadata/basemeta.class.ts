import MdTypeField from './mdTypeField.class'

export default class BaseMeta{
    id: string;
    mdFields:Map<String, MdTypeField> = new Map();
    typeId:string = '';
    modelName:string='';
    typeName:string = '';
    name:string = '';
    sinonym:string = '';
    constructor(id:string){
        this.id = id;
        this.mdFields.set('id', new MdTypeField("UUID", "", id, true, 'id'));
        this.mdFields.set('name', new MdTypeField("char(150)", "", "", false, "name"));
        this.mdFields.set('sinonym', new MdTypeField("char(150)", "", "", false, "sinonym"));
    }
    //get mdFields(){return this._mdfields;}
    //set fields(value){this._fields=value}
}