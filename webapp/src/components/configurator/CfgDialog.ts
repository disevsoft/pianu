import { createApp, h } from 'vue'
import ElementPlus from 'element-plus';
import CfgDialogForm from './CfgDialogForm.vue'
import CfgTest from './CfgTest.vue'
export default class CfgDialog
{
    static openedForms = [];
    public static showDialog(owner:any, unique:string){
      console.log('showDialog');
      
        const appComponent = createApp({
             components: { CfgDialogForm },
             render() {
              console.log('formElementrender');
              const formElement = h(CfgDialogForm,{dialogVisible:true, elementId:unique,onClose: () => CfgDialog.onFormClose(unique)})
              
              
            //   //CfgDialog.openedForms.push({elementId:unique, element:formElement});
               return formElement;
             }
          });
          console.log(owner);
          console.log('showDialoguse');
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