import { createApp, h } from 'vue'
import ElementPlus from 'element-plus';
import CfgDialogForm from './CfgDialogForm.vue'
import CfgTest from './CfgTest.vue'
export default class CfgDialog
{
    static openedForms = [];
    public static showDialog(owner:any, unique:string){
        const appComponent = createApp({
             components: { CfgTest },
             render() {
              const formElement = h(CfgTest,{modelValue:true, targetElmentId:unique,onClose: () => CfgDialog.onFormClose(unique)})
              console.log(formElement);
              
            //   //CfgDialog.openedForms.push({elementId:unique, element:formElement});
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