import {Shape, Circle, Rectangle, Triangle, Observer} from './shapes';

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
    }    
  }

  deleteShape(x:number, y:number) {
    this.shapes = this.shapes.filter(shape => shape !== this.getShapes(x,y));
  }

  modifyShape() {

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
      observer.update(this.shapes);
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
  CIRCLE_RADIUS = 60;
  RECT_WIDTH = 50;
  RECT_HEIGHT = 30;
  TRIAN_HEIGHT = 40;
  TRIAN_EDGE = 40;

  constructor() {
      super();
  }

  createCircle(cx:number, cy:number):Circle {
    return new Circle(cx, cy, this.CIRCLE_RADIUS);
  }
  createTriangle(cx:number, cy:number) :Triangle {
    return new Triangle(cy, cy + 0.5 * this.TRIAN_HEIGHT, 
                        cx - 0.5 * this.TRIAN_EDGE , cy, 
                        cx + 0.5 * this.TRIAN_EDGE, cy);
  }
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