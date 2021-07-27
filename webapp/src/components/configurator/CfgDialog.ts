import { createApp, h } from 'vue'
import ElementPlus from 'element-plus';
import CfgDialogForm from './CfgDialogForm.vue'
import {setMaxZIndex} from './dialogUtils'
export default class CfgDialog
{
    static openedForms = new Map();
    public static showDialog(owner:any, unique:string){
      console.log('showDialog');
      if(unique){
        const formElement = CfgDialog.openedForms.get(unique);
        if(formElement){
          setMaxZIndex(formElement.el.children[0]);
          return;
        }
      }
        const appComponent = createApp({
             components: { CfgDialogForm },
             render() {
              const formElement:any = h(CfgDialogForm,{dialogVisible:true, elementId:unique, onClose: () => CfgDialog.onFormClose(unique)})            
               CfgDialog.openedForms.set(unique, formElement);
               return formElement;
             }
          });
        appComponent.use(ElementPlus) 
        appComponent.mount(owner);
    }
    static onFormClose(unique:string)
    {  
      if(unique){  
        CfgDialog.openedForms.delete(unique);
      }
    }
}