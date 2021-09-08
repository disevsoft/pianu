import EventBus from '../components/webapp/appEventBus'
//import NomenclatureListForm from '../catalogs/nomenclature/NomenclatureListForm.vue'
export class FormFactory{

    private static _openForms:Form[] = [];
    private static _forms = new Map();
    public static openFormById(formId:string){
        EventBus.emit('openForm', formId);    
    }

    public static async initForms(){
        FormFactory._forms.set('NomenclatureListForm', await import('../catalogs/nomenclature/NomenclatureListForm.vue'))
    }

    public static getForm(formName:string){
        return FormFactory._forms.get(formName)['default'];
    }
}

export class Form{
    path = '';
    owner = '';
    objectId = '';
    constructor(){
        const k=1;
    }
}