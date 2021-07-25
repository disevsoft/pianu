import {getMaxZIndex} from '../components/configurator/dialogUtils';

enum Borders{
    None = 0,
    Left,
    Top, 
    Right, 
    Bottom
}

export class SizingElement{
    static elements:any=[];
    static sizers:string[] = [
        'resizeTL',
        'resizeTC',
        'resizeTR',
        'resizeCL',
        'resizeCR',
        'resizeBL',
        'resizeBC',
        'resizeBR',
    ];
    static getSizeElement(){
        if(SizingElement.elements){
            return SizingElement.elements[0];
        }
        return undefined;
    }


    static startResize(element:any, eventArgs:any, sizeBorder:Borders, rect:RectArea){
        console.log('start resize'); 
        SizingElement.elements.push(element);
        element.startResize = true;
        element.startPosition = new Position(eventArgs.clientX, eventArgs.clientY);
        element.sizeBorder = sizeBorder;
        element.rect = rect;
    }
    static stopResize(){
        if(SizingElement.elements && SizingElement.elements[0]){
            SizingElement.elements[0].startResize = false;   
            SizingElement.elements[0].style.cursor = 'default';          
            SizingElement.elements = [];
            console.log('stop resize');          
        }
    } 

    static preventResize(popup:any, mouseArgs:any){
        if(!popup || !popup.startResize) {return};
        const offsetX = (mouseArgs.clientX - popup.startPosition.x);
        const offsetY = (mouseArgs.clientY - popup.startPosition.y);
        if(popup.sizeBorder === Borders.Right){            
           popup.style.width = popup.rect.width + offsetX + "px";    
        }
        if(popup.sizeBorder === Borders.Left){ 
            popup.style.left = popup.offsetLeft + offsetX + "px";  
            popup.style.width = popup.rect.width - offsetX + "px";            
        }
        if(popup.sizeBorder === Borders.Bottom){ 
            popup.style.height = popup.rect.height + offsetY + "px";            
        }
        if(popup.sizeBorder === Borders.Top){ 
            popup.style.top = popup.offsetTop + offsetY + "px"
            popup.style.height = popup.rect.height - offsetY + "px";            
        }

        const clientRect = popup.getBoundingClientRect();
        const size = getSize(popup);   
        popup.rect = new RectArea(clientRect.left, clientRect.top, size.width, size.height);
        popup.startPosition = new Position(mouseArgs.clientX, mouseArgs.clientY);
    }
}
export class Position{
    x = 0;
    y = 0;
    constructor(x:number, y:number){
      this.x = x;
      this.y = y;
    }
};

export class Size{
    height = 0;
    width = 0;
    constructor(width:number, height:number){
      this.height = height;
      this.width = width;
    }

};

export class RectArea{
    size:Size;
    position:Position;
    borderWidth = 10;
    constructor(left:number, top:number, width:number, height:number){
        this.size = new Size(width, height);
        this.position = new Position(left, top);
    }

    public get right(){
        return this.position.x + this.size.width;
    }
    
    public get top(){
        return this.position.y;
    }

    public get left(){
        return this.position.x;
    }

    public get bottom(){
        return this.position.y + this.size.height;
    }

    public get height(){
        return this.size.height
    }

    public get width(){
        return this.size.width
    }

    contain(x:number, y:number){
        return (x>=this.left && x<=this.right && y>=this.top && y<=this.bottom)
    }
    getBorder(x:number, y:number)
    {
        const righBorder = new RectArea(this.right - this.borderWidth/2, this.top, this.borderWidth, this.height);
        if(righBorder.contain(x, y)){return Borders.Right}
        const leftBorder = new RectArea(this.left-this.borderWidth/2, this.top, this.borderWidth, this.height);
        if(leftBorder.contain(x, y)){return Borders.Left}
        const topBorder = new RectArea(this.left, this.top-this.borderWidth/2, this.width, this.borderWidth);
        if(topBorder.contain(x, y)){return Borders.Top}
        const bottomBorder = new RectArea(this.left, this.bottom-this.borderWidth/2, this.width, this.borderWidth);
        if(bottomBorder.contain(x, y)){return Borders.Bottom}
        return Borders.None;
    }
};

export default function initDragResize(ownerId: string, elementName:string, headerName:string){
   // initDrag(elementName, headerName);
    //initResize(ownerId, elementName, headerName)      
}

function initResize(ownerId: string, elementName:string, headerName:string)
{
    const popups:any = document.getElementsByClassName(elementName);   
    const owner:any = document.getElementById(ownerId);
    for (let i = 0; i < popups.length; i++) {
        const popup = popups[i];
        if (!popup){continue}
        // SizingElement.sizers.forEach(elem=>{ 
        //     const sizer:any = document.createElement("div");
        //     sizer.className = elem + " resize";
        //     console.log(sizer.className);
            
        //     owner.appendChild(sizer);
        //     sizer.addEventListener("mousedown", sizerMouseDown, false);
        //     sizer.parentPopup = popup;
        // })
        // for (let k = 0; i < SizingElement.sizers.length; k++) {
        //     console.log(popup);
            
            // const sizer:any = document.createElement("div");
            // sizer.className = SizingElement.sizers[k] + " resize";
            // console.log(sizer.className);
            
            // owner.appendChild(sizer);
            // sizer.addEventListener("mousedown", sizerMouseDown, false);
            // sizer.parentPopup = popup;
        //}
        // if (popup){
        //     document.documentElement.addEventListener("mousemove",sizeMouseMove, false);
        //     document.documentElement.addEventListener("mousedown",sizeMouseDown, false);
        // }  
    }
}
    function sizerMouseDown(e:any){
        console.log(e);
        
    }
    function sizeMouseDown(e:any){
        const popup:any = getParentPopup(e.target); 
        if(!popup){return}
        const clientRect = popup.getBoundingClientRect();
        const size = getSize(popup);   
        const rect = new RectArea(clientRect.left, clientRect.top, size.width, size.height);
         const border = rect.getBorder(e.clientX, e.clientY);
         if(border != Borders.None){
            SizingElement.startResize(popup, e, border, rect);
            document.documentElement.addEventListener('mouseup', sizeMouseUp);
         }
      };

    function sizeMouseUp(e:any){
        document.documentElement.removeEventListener('mouseup', sizeMouseUp);
        SizingElement.stopResize();          
      };

    
    function getCursor(border:Borders){
        let cursor = '';
        if(border=== Borders.Bottom)(cursor = 's-resize');
        if(border=== Borders.Top)(cursor = 'n-resize');
        if(border=== Borders.Left)(cursor = 'w-resize');
        if(border=== Borders.Right)(cursor = 'e-resize');
        return cursor;  
    }

    export function getSize(element:any)
    {
        const dv:any = document.defaultView;
        const computedStyle = dv.getComputedStyle(element);
        return new Size(parseInt(computedStyle.width,10), parseInt(computedStyle.height, 10));
    }

    function sizeMouseMove(e:any){
        
        const sizeElement = SizingElement.getSizeElement();
        let popup:any = undefined;
        if(sizeElement && sizeElement.startResize){
            popup =  sizeElement;  
        }else{
            popup = getParentPopup(e.target);
        }       
            if(!popup){return;}
            const clientRect = popup.getBoundingClientRect();
            const size = getSize(popup);
            const rect = new RectArea(clientRect.left, clientRect.top, size.width, size.height);   
            const border = rect.getBorder(e.clientX, e.clientY);
            e.target.style.cursor = getCursor(border);    
            SizingElement.preventResize(popup, e);
         } 

    function  getParentPopup(elem:any){
      if(!elem || !elem.parentNode){return undefined};
      
        try{
            if(elem.hasAttribute('drag-resize')){return elem};

            if (elem.parentNode.hasAttribute('drag-resize')){
                return elem.parentNode;
            }else{
                const res:any = getParentPopup(elem.parentNode);
                return res;
            }
        }catch(e)
        { 
            return undefined;   
        }
    }

    function initDrag(elementName:string, headerName:string){
        const popups:any = document.getElementsByClassName(elementName);   
        for (let i = 0; i < popups.length; i++) {
        const popup = popups[i];
        const header = getHeader(popup, headerName);
            if(header && popup)
            {
            header.onmousedown = dragMouseDown;
            header.parentPopup = popup;
            }
        }
    };

  function dragMouseDown(e:any){
    const parentElement:any = e.target.parentPopup;
    if(!parentElement){return;}
    let zIndex:number = getMaxZIndex();
    parentElement.style.zIndex = "" + ++zIndex;
    e = e || window.event;
    parentElement.position = new Position(e.clientX, e.clientY)
    document.documentElement.addEventListener('mousemove', elementDrag)
    document.documentElement.addEventListener('mouseup', closeDragElement)
    return;
  };

  function elementDrag(e:any){
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

  function closeDragElement(e:any){
    document.documentElement.removeEventListener('mousemove', elementDrag)
    document.documentElement.removeEventListener('mouseup', closeDragElement)
  };

  function getHeader(element:any, headerName:string){
    const headerItems = element.getElementsByClassName(headerName);
    if (headerItems.length === 1) {
      return headerItems[0];
    }
    return null;
  };
  