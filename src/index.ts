import 'bootstrap'; //bootstrap.js for button toggling
import {Model} from './model';
import {View as CanvasView} from './view-canvas';
import {View as TextView} from './view-text';
import {TextController} from './controller';
import {CanvasController} from './controller';
var autoResize = require('autoresize-textarea');

let model = new Model();

let canvasView = new CanvasView(model);
let textView = new TextView(model);

let canvasController = new CanvasController(model, canvasView);
let textController = new TextController(model, textView);

canvasView.setController(canvasController);
textView.setController(textController);
