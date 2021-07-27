import {getMaxZIndex} from '../components/configurator/dialogUtils';

export const Sizers:string[] = [
    'resizeTL',
    'resizeTC',
    'resizeTR',
    'resizeCL',
    'resizeCR',
    'resizeBL',
    'resizeBC',
    'resizeBR',
];
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
};

export class DragResize{
    
    private dragResizeElement:any = null;
    startRectArea:RectArea =new RectArea(0,0,0,0);
    startPosition:Position = new Position(0,0);
    sizingBorder='';
    dragResizeElementId = '';

    draggerMouseMoveHandler:any = null;
    draggerMouseUpHandler:any = null;
    draggerMouseDownHandler:any = null;
    sizerMouseMoveHandler:any = null;
    sizerMouseUpHandler:any = null;
    sizerMouseDownHandler:any = null;

    constructor(dragResizeElementId:string)
    {
        this.dragResizeElementId = dragResizeElementId;
        this.dragResizeElement = document.getElementById(dragResizeElementId);
        
        const sizers = this.dragResizeElement.getElementsByClassName("resize");
        this.sizerMouseDownHandler = ((event:any) => this.sizerMouseDown(event, this));
        for (let i = 0; i < sizers.length; i++) {
            const sizer = sizers[i];
            sizer.addEventListener('mousedown',  this.sizerMouseDownHandler, false);
        }

        this.draggerMouseDownHandler = ((event:any) => this.draggerMouseDown(event, this));
        const draggers = this.dragResizeElement.getElementsByClassName("drag-header");
        for (let i = 0; i < draggers.length; i++) {
            const dragger = draggers[i];       
            dragger.addEventListener('mousedown', this.draggerMouseDownHandler, false);
        }
    }


    public static init(dragResizeElementId:string){
        const dragResizer = new DragResize(dragResizeElementId);
        return dragResizer;
    }

    public expand(){
        
        const clientRect = this.dragResizeElement.getBoundingClientRect();
        const size:any = this.getComputedStyleSize(this.dragResizeElement);   
        this.startRectArea = new RectArea(clientRect.left, clientRect.top, size.width, size.height);
        this.setElementStyle(this.dragResizeElement, 10, 10, 500, 500);
    }
    public restore(){
       this.setElementStyleByRect(this.dragResizeElement, this.startRectArea);       
    }

    setElementStyleByRect(element:any, rectArea:RectArea){
        this.setElementStyle(element, rectArea.left, rectArea.top, rectArea.width, rectArea.height);          
    }
    private upZIndex(element:any){
        
        if(!element){return};
        let zIndex = getMaxZIndex();
         element.style.zIndex = "" + ++zIndex;
    };

    setSizerMouseMoveHandler(context:DragResize){
        if(!context.sizerMouseMoveHandler){
            context.sizerMouseMoveHandler = ((event:any)=>context.sizerMouseMove(event, context));
        }
        document.addEventListener('mousemove', context.sizerMouseMoveHandler, false)  
    }

    setSizerMouseUpHandler(context:DragResize){
        if(!context.sizerMouseUpHandler){
            context.sizerMouseUpHandler = ((event:any)=>context.sizerMouseUp(event, context));
        }
        document.addEventListener('mouseup', context.sizerMouseUpHandler, false)
    }

    sizerMouseDown(e:any, context:DragResize){

        context.upZIndex(context.dragResizeElement);      
        context.setSizerMouseMoveHandler(context);
        context.setSizerMouseUpHandler(context);
        document.addEventListener('mouseup', context.sizerMouseUpHandler, false)
        context.setStartPosition(context, e);
        context.sizingBorder = e.target.className;
    }

    setStartPosition(context:any, e:any){
        const clientRect = context.dragResizeElement.getBoundingClientRect();
        const size:any = context.getComputedStyleSize(context.dragResizeElement);   
        context.startRectArea = new RectArea(clientRect.left, clientRect.top, size.width, size.height);
        context.startPosition = new Position(e.clientX, e.clientY);
    }
    sizerMouseMove(e:any, context:DragResize){
        const offsetX = (e.clientX - context.startPosition.x);
        const offsetY = (e.clientY - context.startPosition.y);
       
        let left = context.startRectArea.left;
        let top = context.startRectArea.top;
        let height = context.startRectArea.height;
        let width = context.startRectArea.width;
   
        if(context.sizingBorder.includes('resizeCR') || context.sizingBorder.includes('resizeBR') ||context.sizingBorder.includes('resizeTR')){
          width = context.startRectArea.width + offsetX; 
        }
        if(context.sizingBorder.includes('resizeBC') || context.sizingBorder.includes('resizeBR') ||context.sizingBorder.includes('resizeBL')){
          height = context.startRectArea.height + offsetY;   
        }

         if(context.sizingBorder.includes('resizeCL')||context.sizingBorder.includes('resizeTL') ||context.sizingBorder.includes('resizeBL')){       
          left =  context.startRectArea.left + offsetX;
          width = context.startRectArea.width - offsetX;
        }

        if(context.sizingBorder.includes('resizeTC') || context.sizingBorder.includes('resizeTR') ||context.sizingBorder.includes('resizeTL')){
          top = context.startRectArea.top + offsetY
          height = context.startRectArea.height - offsetY;    
        }

        context.setElementStyle(context.dragResizeElement, left, top, width, height);
        context.startRectArea = new RectArea(left, top, width, height);
        context.startPosition = new Position(e.clientX, e.clientY);      
    }

    setElementStyle(element:any, left:number, top:number, width:number, height:number){
        element.style.width = width + "px"; 
        element.style.height = height + "px"; 
        element.style.top = top + "px";
        element.style.left = left + "px";    
    }
    sizerMouseUp(e:any, context:DragResize){
       
        document.removeEventListener('mousemove', context.sizerMouseMoveHandler, false);  
        document.removeEventListener('mouseup',context.sizerMouseUpHandler, false); 
        context.sizingBorder = '';
    }

    draggerMouseUp(e:any, context:DragResize){
        document.removeEventListener('mousemove', context.draggerMouseMoveHandler, false);  
        document.removeEventListener('mouseup', context.draggerMouseUpHandler, false); 
    }

    setDraggerMouseMoveHandler(context:DragResize){
        if(!context.draggerMouseMoveHandler){
            context.draggerMouseMoveHandler = ((event:any) => context.draggerMouseMove(event, context));
        }
        document.addEventListener('mousemove', context.draggerMouseMoveHandler, false);  
    }

    setDraggerMouseUpHandler(context:DragResize){
        if(!context.draggerMouseUpHandler){
            context.draggerMouseUpHandler = (event:any)=>context.draggerMouseUp(event, context);
        }
        document.addEventListener('mouseup', context.draggerMouseUpHandler, false)
    }

    draggerMouseDown(e:any, context:DragResize){           
        context.setDraggerMouseMoveHandler(context);
        context. setDraggerMouseUpHandler(context);
        context.upZIndex(context.dragResizeElement);
        context.setStartPosition(context, e);
    }

    getComputedStyleSize(element:any)
    {
        const dv:any = document.defaultView;
        const computedStyle = dv.getComputedStyle(element);
        return new Size(parseInt(computedStyle.width,10), parseInt(computedStyle.height, 10));
    };

    draggerMouseMove(e:any, context:DragResize){
        
        context.dragResizeElement.style.top = context.dragResizeElement.offsetTop - (context.startPosition.y - e.clientY) + "px";
        context.dragResizeElement.style.left = context.dragResizeElement.offsetLeft - (context.startPosition.x - e.clientX) + "px";    
        context.startPosition = new Position(e.clientX, e.clientY);   
    }
}



  