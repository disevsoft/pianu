<template>
<div class="popup">
    <el-header
        class="popup-header"
        id="modalTitle"
      >
       
    </el-header>
    <el-main>
      
    </el-main>
    <el-footer>
    </el-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

class Position{
    x = 0;
    y = 0;
    constructor(x:number, y:number){
      this.x = x;
      this.y = y;
    }
};

class Size{
    height = 0;
    width = 0;
    constructor(height:number, width:number){
      this.height = height;
      this.width = width;
    }

};

class RectArea{
  size:Size;
  position:Position;
  constructor(left:number, top:number, height:number, width:number){
    this.size = new Size(left, top);
    this.position = new Position(left, top);
  }
};

export default defineComponent({
    props: { 
        'modelValue': [Boolean], 
    },
    setup () {
       onMounted(() => {
         const elem:any = document.getElementsByClassName("popup")[0];         
         initDragElement(elem);
        });
        
        const initDragElement = async (element:any)=>{
          const header:any = await getHeader(element);    
          if(header)
          {
            header.onmousedown = dragMouseDown;
            header.parentPopup = element;
          }
        };

        const dragMouseDown=(e:any)=>{
          const parentElement:any = e.target.parentPopup;
          e = e || window.event;
          parentElement.position = new Position(e.clientX, e.clientY)
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
        };

        const elementDrag=(e:any)=>{
           e = e || window.event; 
          const parentElement:any = e.target.parentPopup; 
          if(!parentElement){return;}       
          const startPos:Position = parentElement.position;
          if(!startPos){return;}
          parentElement.style.top = parentElement.offsetTop - (startPos.y - e.clientY) + "px";
          parentElement.style.left = parentElement.offsetLeft - (startPos.x - e.clientX) + "px";
          
          parentElement.position.x = e.clientX;
          parentElement.position.y = e.clientY;
        };

        const closeDragElement=(e:any)=>{
          document.onmouseup = null;
          document.onmousemove = null;
        };

        const getHeader=(element:any) =>{
          var headerItems = element.getElementsByClassName("popup-header");
          if (headerItems.length === 1) {
            return headerItems[0];
          }
          return null;
        };


        return {}
    }
})
</script>


<style ang="scss">
/*--------------------------------*/ 
.vue-grid-item.cssTransforms { transition-property: inherit !important; }
  .vue-resizable.resizing { pointer-events: none; }
  .vue-draggable-dragging { pointer-events: none; }

.popup {
  z-index: 9;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;
  min-height: 150px;
  min-width: 300px;
  /* max-height: 300px;
  max-width: 600px; */
}

/*Drgable */

.popup {
  top:25%;
  position: fixed;
  height:300px;
  /*resize: both; /*!*enable this to css resize*! */
  overflow: auto;
}

.popup-header {
  height:30px !important;
  padding:0px 0px !important;
  cursor: move;
  z-index: 10;
  background-color: #2196f3;
  color: #fff;
}

/*Resizeable*/

.popup .resizer-right {
  width: 5px;
  height: 100%;
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: e-resize;
}

.popup .resizer-bottom {
  width: 100%;
  height: 5px;
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: n-resize;
}

.popup .resizer-both {
  width: 5px;
  height: 5px;
  background: transparent;
  z-index: 10;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: nw-resize;
}

/*NOSELECT*/

.popup * {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
.el-main{
  padding:0px
}
</style>