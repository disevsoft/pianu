<template>
<div id ="form" class="panelsBorder panelsShade cloud drag-size" >
<div class="fullSize" :id="elementId" >
  <el-container>
    <el-header
        class="drag-header"
        id="modalTitle"
        @mousedown = "dragMouseDown"
      >
      {{coord}}  
    </el-header>
    <el-main>
     
    </el-main>
    <el-footer>
    </el-footer>
    </el-container>

    <i v-for="sizer in sizers()" :key="sizer" :class= "'resize ' + sizer" @mousedown = "sizerMouseDown"></i>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref,computed } from 'vue'
import initDragResize,  {SizingElement, Size, Position} from '../../helpers/dragResize'
import {RectArea} from '../../helpers/dragResize'


export default defineComponent({ 
    props: { 
        'elementId': String,
        'modelValue': [Boolean], 
    },
    setup (props, { emit }) {

      const sizers=()=>{
        return SizingElement.sizers;
      };

     
      let elementId = '';
      let startRectArea:RectArea; 
      let startPosition:Position;
      let inSizingControl:any;
      let sizingBorder:string;


      const sizerMouseDown = (e:any)=>{
        inSizingControl=document.getElementById(elementId);
        console.log(inSizingControl);
        
        addEventListener('mousemove', sizerMouseMove, false)  
        addEventListener('mouseup', sizerMouseUp, false)
        const clientRect = inSizingControl.getBoundingClientRect();
        const size:any = getSize(e.target.parentNode);   
        startRectArea = new RectArea(clientRect.left, clientRect.top, size.width, size.height);
        startPosition = new Position(e.clientX, e.clientY);
        sizingBorder = e.target.className;
      };

      const dragMouseDown = (e:any)=>{
        inSizingControl=document.getElementById(elementId);
        if(!inSizingControl){return};
        addEventListener('mousemove', dragMouseMove, false)  
        addEventListener('mouseup', sizerMouseUp, false)
        const clientRect = inSizingControl.getBoundingClientRect();
        const size:any = getSize(e.target.parentNode);   
        startRectArea = new RectArea(clientRect.left, clientRect.top, size.width, size.height);
        startPosition = new Position(e.clientX, e.clientY);
      };

      const dragMouseMove= (e:any)=>{
        if(!inSizingControl){
          return;
        }
        inSizingControl.style.top = inSizingControl.offsetTop - (startPosition.y - e.clientY) + "px";
        inSizingControl.style.left = inSizingControl.offsetLeft - (startPosition.x - e.clientX) + "px";     
        const clientRect =  inSizingControl.getBoundingClientRect();  
         const size = getSize(inSizingControl);   
         startPosition = new Position(e.clientX, e.clientY);   
      }
      const sizerMouseMove= (e:any)=>{
        const offsetX = (e.clientX - startPosition.x);
        const offsetY = (e.clientY - startPosition.y);
       
        let left = startRectArea.left;
        let top = startRectArea.top;
        let height = startRectArea.height;
        let width = startRectArea.width;
   
        if(sizingBorder.includes('resizeCR') || sizingBorder.includes('resizeBR') ||sizingBorder.includes('resizeTR')){
          width = startRectArea.width + offsetX; 
        }
        if(sizingBorder.includes('resizeBC') || sizingBorder.includes('resizeBR') ||sizingBorder.includes('resizeBL')){
          height = startRectArea.height + offsetY;   
        }

         if(sizingBorder.includes('resizeCL')||sizingBorder.includes('resizeTL') ||sizingBorder.includes('resizeBL')){       
          left =  startRectArea.left + offsetX;
          width = startRectArea.width - offsetX;
        }

        if(sizingBorder.includes('resizeTC') || sizingBorder.includes('resizeTR') ||sizingBorder.includes('resizeTL')){
          top = startRectArea.top + offsetY
          height = startRectArea.height - offsetY;    
        }
        inSizingControl.style.width = width + "px"; 
        inSizingControl.style.height = height + "px"; 
        inSizingControl.style.top = top + "px";
        inSizingControl.style.left = left + "px";
       
         const clientRect =  inSizingControl.getBoundingClientRect();  
         const size = getSize(inSizingControl);   
         startRectArea = new RectArea(left, top, width, height);
         startPosition = new Position(e.clientX, e.clientY);      
      };

       function getSize(element:any)
      {
          const dv:any = document.defaultView;
          const computedStyle = dv.getComputedStyle(element);
          return new Size(parseInt(computedStyle.width,10), parseInt(computedStyle.height, 10));
      };

      const sizerMouseUp= (e:any)=>{
        removeEventListener('mousemove', sizerMouseMove);  
        removeEventListener('mouseup', sizerMouseUp); 
        removeEventListener('mousemove', dragMouseMove)  
        inSizingControl = null;
      };
      const coord = ref('');
       const coordpop = ref('');

       onMounted(() => {
         console.log(props.elementId)
          elementId =(props.elementId as string); 
        });
        
        return {coord, coordpop, sizers, sizerMouseDown, sizerMouseUp, sizerMouseMove, dragMouseDown}
    }
})
</script>


<style ang="scss">
/*--------------------------------*/ 
.vue-grid-item.cssTransforms { transition-property: inherit !important; }
  .vue-resizable.resizing { pointer-events: none; }
  .vue-draggable-dragging { pointer-events: none; }

.drag-size{

}
.panelsBorder {
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0,0,0,0.4);
}

.panelsShade {
    -webkit-box-shadow: 0 0 7px 0 rgb(0 0 0 / 20%);
    box-shadow: 0 0 7px 0 rgb(0 0 0 / 20%);
}

.cloud {
    background: #fff;
    position: absolute;
    max-width: 100%;
    line-height: 1.2;
}



.fullSize {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height:300px;
    width:300px;
}


/*Resizeable*/




/*NOSELECT*/


.el-main{
  padding:0px
}
</style>