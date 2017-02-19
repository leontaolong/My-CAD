import {Shape, Circle, Rectangle, Triangle} from './shapes';

/**
 * The CAD drawing model currently being created
 */
export class Model {
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

  addShapes(type: string, x: number, y:number) {
    if (type != null) {
      let makeShape = new ShapeFactory();
      let shape:Shape;
      switch(type) {
          case "circle":
              shape = makeShape.createCircle(x, y);
              break;
          case "rectangle":
              shape = makeShape.createRectangle(x, y);
              break;
          case "triangle":
              shape = makeShape.createTriangle(x, y);
              break;             
          default:
              console.log("invalid shape type");
      }
      this.shapes.push(shape);
    }    
  }

}

//an interface for a complex factory
abstract class Factory {
  abstract createCircle(cx:number, cy:number, radius:number):Circle;
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
