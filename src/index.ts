import 'bootstrap'; //bootstrap.js for button toggling

import {Model} from './model';
import {View as CanvasView} from './view-canvas';


let model = new Model();
let canvasView = new CanvasView(model);

//TODO: more views and controllers here...