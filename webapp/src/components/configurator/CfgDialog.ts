import { createApp, h } from 'vue'
import ElementPlus from 'element-plus';
import CfgDialogForm from './CfgDialogForm.vue'
import {setMaxZIndex} from './dialogUtils'
import FormEvents from '../../helpers/formEvents'
import EventBus from './CfgEventBus';
export default class CfgDialog
{
    static openedForms = new Map();
    public static showDialog(owner:any, unique:string, data?:any){

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
              const formElement:any = h(CfgDialogForm,{dialogVisible:true, elementId:unique, formEvents:formEvents, data:data});            
               CfgDialog.openedForms.set(unique, formElement);
               return formElement;
             }
          });
        appComponent.use(ElementPlus) 
        appComponent.mount(owner);
    }

    public static showChooseDialog(owner:any, unique:string, data?:any, filter?:any){  
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
              const formElement:any = h(CfgDialogForm,{dialogVisible:true, elementId:unique, formEvents:formEvents, data:data, filter:filter});            
               CfgDialog.openedForms.set(unique, formElement);
               return formElement;
             }
          });
        appComponent.use(ElementPlus) 
        appComponent.mount(owner);
    }

    private static afterFormClose(eventArgs:any){
      //EventBus.emit('dataChoosed', eventArgs);
      if(eventArgs.elementId){
        CfgDialog.openedForms.delete(eventArgs.elementId);
      }
    }
}
