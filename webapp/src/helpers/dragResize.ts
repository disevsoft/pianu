import {getMaxZIndex} from '../components/configurator/dialogUtils';

enum Borders{
    None = 0,
    Left,
    Top, 
    Right, 
    Bottom
}

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
    constructor(width:number, height:number){
      this.height = height;
      this.width = width;
    }

};

class RectArea{
    size:Size;
    position:Position;
    borderWidth = 3;
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
        const righBorder = new RectArea(this.right - this.borderWidth, this.top, this.borderWidth, this.height);
        if(righBorder.contain(x, y)){return Borders.Right}
        const leftBorder = new RectArea(this.left, this.top, this.borderWidth, this.height);
        if(leftBorder.contain(x, y)){return Borders.Left}
        const topBorder = new RectArea(this.left, this.top, this.width, this.borderWidth);
        if(topBorder.contain(x, y)){return Borders.Top}
        const bottomBorder = new RectArea(this.left, this.bottom-this.borderWidth, this.width, this.borderWidth);
        if(bottomBorder.contain(x, y)){return Borders.Bottom}
        console.log(bottomBorder, y)
        return Borders.None;
    }
};

export default function initDragResize(elementName:string, headerName:string){
    initDrag(elementName, headerName);
    initResize(elementName, headerName)      
}

function initResize(elementName:string, headerName:string)
{

    const popups:any = document.getElementsByClassName(elementName);   
    for (let i = 0; i < popups.length; i++) {
        const popup = popups[i];
        if (popup){
            // const right:any = document.createElement("div");
            // right.className = "resizer-right";
            // popup.appendChild(right);
            // right.addEventListener("mousedown", initResize, false);
            // right.parentPopup = popup;
            popup.onmousemove = sizeMouseMove; 
        }  
        }
    }

    function sizeMouseMove(e:any){
        setCursor(e.target, e);

    } 

    function setCursor(popup:any, e:any){
        if(!popup) {return;}
        const clientRect = popup.getBoundingClientRect();
        
        const st = window.getComputedStyle(popup, null);
        const rect = new RectArea(clientRect.x, clientRect.y, parseInt(st.width, 10), parseInt(st.height, 10));


        //const rect = new RectArea(clientRect.x, clientRect.y, clientRect.width, clientRect.height);
        //console.log(rect.getBorder(e.clientX, e.clientY));
        console.log(clientRect.y, popup.offsetHeight);
        
        console.log(clientRect.y + popup.offsetHeight , e);
        
        
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
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
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
    document.onmouseup = null;
    document.onmousemove = null;
  };

  function getHeader(element:any, headerName:string){
    const headerItems = element.getElementsByClassName(headerName);
    if (headerItems.length === 1) {
      return headerItems[0];
    }
    return null;
  };
  