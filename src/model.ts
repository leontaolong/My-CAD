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

  //TODO: Add more methods...

}
