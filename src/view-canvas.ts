import {DrawableShape} from './shapes';
import {Model} from './model';

/**
 * A class to represent the View. Contains control buttons and an HTML5 canvas.
 */
export class View implements Observer{
  //constants for access
  readonly canvas = <HTMLCanvasElement>$('#graphics-view canvas')[0];
  readonly brush = this.canvas.getContext('2d'); //will be correctly typed!

  private selected:DrawableShape; //selected state is handled by View
  private action:string; //what action we are doing (handled by View)


  constructor(private model:Model){
    //event listeners (DOM for readability/speed)
    this.canvas.addEventListener('mousedown', (e) => {this.handleMouseDown(e)});
    this.canvas.addEventListener('mouseup', (e) => {this.handleMouseUp(e)});
    this.canvas.addEventListener('mousemove', (e) => {this.handleMove(e)});
    
    //register self (delegation!) 
    model.registerObserver(this);

    let optionButtons = $("#graphics-view input:radio");
    this.action = optionButtons.val(); //current (initial) selection    
    optionButtons.change((e) => { this.action = $(e.target).val();  console.log(this.action); }); //update action

    //responsive canvas
    $(window).resize(() => {this.resizeCanvas()}); //call function on window resize
    this.resizeCanvas(); //initial sizing

  }


  display(shapes: DrawableShape[]) {
    //erase canvas
    this.brush.clearRect(0,0, this.canvas.width, this.canvas.height);

    //draw all the shapes!
    for(let shape of shapes){
      shape.draw(this.brush);
    }
  }

  handleMouseDown(event:MouseEvent){
    let x = event.offsetX;
    let y = event.offsetY;

    if(this.action === 'move') { 
      this.selected = <DrawableShape>this.model.getShapeAt(x,y);
    }
    else if(this.action === 'delete') {
      this.model.deleteShape(x,y);
    }
    else { 
      this.model.addShape(this.action, x, y);
    }
  }  

  handleMouseUp(event:MouseEvent){
    this.selected = undefined;    
  }

  handleMove(event:MouseEvent){
    let x = event.offsetX;
    let y = event.offsetY;

    if(this.selected){
      //TODO: move the selected shape to x,y
    }
  }

  //make Canvas responsive (adapted from http://ameijer.nl/2011/08/resizable-html5-canvas/)
  resizeCanvas() {
    const ratio = 1; //4/3;
    let canvasElem = $(this.canvas);
    canvasElem.attr('width', canvasElem.parent().width());
    canvasElem.attr('height', ratio*canvasElem.width());
    this.display();
  }

  /* Observer interface */
  update(shapes: DrawableShape[]) {
    this.display(shapes);
  }
}

//Behaviors for Observers (subscribers)
export interface Observer {
    update(shapes: DrawableShape[]):void;
}
