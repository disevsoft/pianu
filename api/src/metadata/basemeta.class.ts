import MdTypeField from './mdTypeField.class'

export default class BaseMeta{
    id: string;
    mdFields:Array<MdTypeField> = [];
    typeId:string = '';
    modelName:string='';
    typeName:string = '';
    name:string = '';
    synonym:string = '';
    constructor(id:string){
        this.id = id;
        this.mdFields.push(new MdTypeField('id', "UUID", "", id, true, 'id'));
        this.mdFields.push(new MdTypeField('name', "char(150)", "", "", false, "name"));
        this.mdFields.push(new MdTypeField('synonym', "char(150)", "", "", false, "synonym"));
    }
    //get mdFields(){return this._mdfields;}
    //set fields(value){this._fields=value}
}