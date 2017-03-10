import {Model} from './model';
import {View as CanvasView} from './view-canvas';
import {View as TextView} from './view-text';

export class CanvasController {
  constructor(private model:Model, private view:CanvasView) {}
  addShape(type, x, y) {
    this.model.addShape(type, x, y);
  }

  moveShape(shape, x, y) {
    this.model.moveShape(shape, x, y);
  }

  deleteShape(x, y) {
    this.model.deleteShape(x, y);
  }
}

export class TextController {
  constructor(private model:Model, private view:TextView) {}
  modifyShape(shapesArray) {
      this.model.modifyShape(shapesArray);
  }
}