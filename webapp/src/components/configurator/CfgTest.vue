<template>
<el-container div v-show="modelValue " class="popup">
    <el-header
        class="popup-header"
        id="modalTitle"
      >
        <slot name="header">
          Header
        </slot>
        <i
          type="button" 
          class="btn-full-screen el-icon-full-screen"
          @click="close"
          aria-label="Close modal"
        >
          </i>
        <i
          type="button"
          class="btn-close el-icon-close"
          @click="close"
          aria-label="Close modal"
        >
        </i>
    </el-header>
    <el-main>
      <component :is="currentComponent" @dataChoosen="onDataChoosen"></component>
    </el-main>
    <el-footer>
      <el-button @click="onOkButtonClick">OK</el-button>
      <el-button @click="onCancelButtonClick">Cancel</el-button>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import {GetMaxZIndex} from './dialogUtils'
export default defineComponent({
    props: { 
        'modelValue': [Boolean], 
    },
    setup () {
       onMounted(() => {
           console.log('mnt');
        });

        ////////////
        const initDragElement=()=> {
            var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
            var popups = document.getElementsByClassName("popup");
            var elmnt:any = null;
            //var currentZIndex = 100; //TODO reset z index when a threshold is passed

            for (var i = 0; i < popups.length; i++) {
                var popup:any = popups[i];
                var header = getHeader(popup);
                let zIndex:number = await GetMaxZIndex(); 
                popup.style.zIndex = "" + ++zIndex;
                popup.onmousedown = function() {
                    let zIndex = await GetMaxZIndex(); 
                    this.style.zIndex = "" + ++zIndex;    
                };
                if (header) {
                    header.parentPopup = popup;
                    header.onmousedown = dragMouseDown;
                }
            }

            function dragMouseDown(e:any) {
            elmnt = this.parentPopup;
                let zIndex = await GetMaxZIndex();
            elmnt.style.zIndex = "" + ++zIndex;

            e = e || window.event;
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
            if (!elmnt) {
                return;
            }

            e = e || window.event;
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = elmnt.offsetTop - pos2 + "px";
            elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
            }

            function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            }

            function getHeader(element) {
            var headerItems = element.getElementsByClassName("popup-header");

            if (headerItems.length === 1) {
                return headerItems[0];
            }

            return null;
            }
      },

initResizeElement() {
  var popups = document.getElementsByClassName("popup");
  var element = null;
  var startX, startY, startWidth, startHeight;

  for (var i = 0; i < popups.length; i++) {
    var p = popups[i];

    var right = document.createElement("div");
    right.className = "resizer-right";
    p.appendChild(right);
    right.addEventListener("mousedown", initDrag, false);
    right.parentPopup = p;

    var bottom = document.createElement("div");
    bottom.className = "resizer-bottom";
    p.appendChild(bottom);
    bottom.addEventListener("mousedown", initDrag, false);
    bottom.parentPopup = p;

    var both = document.createElement("div");
    both.className = "resizer-both";
    p.appendChild(both);
    both.addEventListener("mousedown", initDrag, false);
    both.parentPopup = p;
  }

  function initDrag(e) {
    element = this.parentPopup;

    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );
    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  }

  function doDrag(e) {
    element.style.width = startWidth + e.clientX - startX + "px";
    element.style.height = startHeight + e.clientY - startY + "px";
  }

  function stopDrag() {
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  }
},
        //////////////



        return {}
    }
})
</script>

<style ang="scss">
/*--------------------------------*/ 
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