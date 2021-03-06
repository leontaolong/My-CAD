import {Shape, Circle, Rectangle, Triangle, DrawableShape} from './shapes';
import {Observer} from './view-canvas';

/**
 * The CAD drawing model currently being created
 */
export class Model implements Subject{
  private observers:Observer[] = [];
  private shapes:Shape[] = [];

  constructor() {}

  getShapes():Shape[] {
    return this.shapes;    
  }

  getShapeAt(x:number, y:number):Shape{
    let found:Shape;
    for(let shape of this.shapes){
      if(shape.contains(x,y)){
        found = shape;
      }
    }
    return found; //return last shape
  }

  addShape(type: string, x: number, y:number) {
    if (type != null) {
      let makeShape = new ShapeFactory();
      let newShape:Shape;
      switch(type) {
          case "circle":
              newShape = makeShape.createCircle(x, y);
              break;
          case "rectangle":
              newShape = makeShape.createRectangle(x, y);
              break;
          case "triangle":
              newShape = makeShape.createTriangle(x, y);
              break;             
          default:
              console.log("invalid shape type");
      }
      this.shapes.push(newShape);
      this.notifyAll();
    }    
  }

  deleteShape(x:number, y:number) {
    this.shapes = this.shapes.filter(shape => shape !== this.getShapeAt(x,y));
    this.notifyAll();
  }

  modifyShape(newShapes) {
    for (let i =0; i < newShapes.length; i++) {
      //code here using lines[i] which will give you each line
      let shape: Shape = JSON.parse(newShapes[i]);
      this.shapes[i].updateProperties(shape);
    }
    this.notifyAll();
  }

  moveShape(shape:Shape, x:number, y:number) {
    shape.setPosition(x, y);
    this.notifyAll();
  }

  /* implement Subject interface */
  registerObserver(observer:Observer):void {
    this.observers.push(observer);
  }

  removeObserver(observer:Observer):void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyAll():void {    
    this.observers.forEach((observer:Observer) => { 
      observer.update(<DrawableShape[]>this.shapes);
    });
  }
}

//an interface for a complex factory
abstract class Factory {
  abstract createCircle(cx:number, cy:number):Circle;
  abstract createTriangle(cx:number, xy:number):Triangle;
  abstract createRectangle(cx:number, cy:number):Rectangle;
}

//a concrete class that implements the Factory
class ShapeFactory extends Factory {
  private CIRCLE_RADIUS = 40;
  private RECT_WIDTH = 40;
  private RECT_HEIGHT = 30;
  private TRIAN_HEIGHT = 40;
  private TRIAN_EDGE = 40;

  constructor() {
      super();
  }

  createCircle(cx:number, cy:number):Circle {
    return new Circle(cx, cy, this.CIRCLE_RADIUS);
  }
  createTriangle(cx:number, cy:number) :Triangle {
    return new Triangle(cx, cy + 0.5 * this.TRIAN_HEIGHT,
      cx - 0.5 * this.TRIAN_EDGE, cy - 0.5 * this.TRIAN_HEIGHT,
      cx + 0.5 * this.TRIAN_EDGE, cy -  0.5 * this.TRIAN_HEIGHT);
  }

// createTriangle(cx: number, cy: number): Triangle {
//     return new Triangle(cx, cy ,
//       cx - 0.5 * this.DEFAULT_WIDTH, cy - this.DEFAULT_HEIGHT,
//       cx + 0.5 * this.DEFAULT_WIDTH, cy - this.DEFAULT_HEIGHT);
//   }

  createRectangle(cx:number, cy:number):Rectangle {
    return new Rectangle(cx,cy, this.RECT_WIDTH, this.TRIAN_EDGE);
  }
}

//Behaviors for Subjects (publishers)
export interface Subject {
  registerObserver(observer:Observer):void;
  removeObserver(observer:Observer):void;
  notifyAll():void;
}