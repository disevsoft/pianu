import { uuid } from 'vue-uuid';

export async function getMdTreeRoot() {
    return fetch('/api/mdtreeroot').then(async response=>
     {
       const datа = await response.json();
        return await setElementId(datа);
     });
 }

 async function setElementId(data: Array<any>) {
    data.forEach(element => {
      element.elementId = uuid.v4();
    });
    return data;
  }