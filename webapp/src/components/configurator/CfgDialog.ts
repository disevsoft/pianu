import { createApp, h } from 'vue'
import ElementPlus from 'element-plus';
import CfgDialogForm from './CfgDialogForm.vue'
import {getMaxZIndex} from './dialogUtils'
export default class CfgDialog
{
    static openedForms = new Map();
    public static showDialog(owner:any, unique:string){
      console.log('showDialog');
      if(unique){
        const formData = CfgDialog.openedForms.get(unique);
        if(formData){
         let zIndex =getMaxZIndex()
          formData.el.children[0].style.zIndex= "" + ++zIndex;
          console.log(formData);
          
          return;
        }
      }
        const appComponent = createApp({
             components: { CfgDialogForm },
             render() {
              console.log('formElementrender');
              const formElement = h(CfgDialogForm,{dialogVisible:true, elementId:unique, onClose: () => CfgDialog.onFormClose(unique)})            
               CfgDialog.openedForms.set(unique, formElement);
               return formElement;
             }
          });
        appComponent.use(ElementPlus) 
        appComponent.mount(owner);
    }
    static onFormClose(unique:string)
    { 
    //   if(unique){  
    //     const formDataindex = CfgDialog.openedForms.findIndex(el => el.elementId === unique);
    //     CfgDialog.openedForms.splice(formDataindex,1);
    //   }
    }
}