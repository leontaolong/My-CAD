import 'bootstrap'; //bootstrap.js for button toggling

import {Model} from './model';
import {View as CanvasView} from './view-canvas';
import {View as TextView} from './view-text';
import {TextController} from './controller';
import {CanvasController} from './controller';

let model = new Model();
let canvasView = new CanvasView(model);
let textView = new TextView(model);
// let ctrl:Controller = new Controller();