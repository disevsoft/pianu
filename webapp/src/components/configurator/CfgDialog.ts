import { createApp, h } from 'vue'
import ElementPlus from 'element-plus';
import CfgDialogForm from './CfgDialogForm.vue'
import {setMaxZIndex} from './dialogUtils'
import FormEvents from '../../helpers/formEvents'

export default class CfgDialog
{
    static openedForms = new Map();
    public static showDialog(owner:any, unique:string){

      if(unique){
        const formElement = CfgDialog.openedForms.get(unique);
        if(formElement){
          setMaxZIndex(formElement.el.children[0]);
          return;
        }
      }
        const formEvents = new FormEvents(unique);
        formEvents.on('afterClose', CfgDialog.afterFormClose);
        const appComponent = createApp({
             components: { CfgDialogForm },
             render() {     
              const formElement:any = h(CfgDialogForm,{dialogVisible:true, elementId:unique, formEvents:formEvents});            
               CfgDialog.openedForms.set(unique, formElement);
               return formElement;
             }
          });
        appComponent.use(ElementPlus) 
        appComponent.mount(owner);
    }

    private static afterFormClose(evetArgs:any){
      console.log('afterFormClose');
      
      if(evetArgs.elementId){
        CfgDialog.openedForms.delete(evetArgs.elementId);
      }
    }
}
