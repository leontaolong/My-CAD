"use strict";
require("bootstrap"); //bootstrap.js for button toggling
var model_1 = require("./model");
var view_canvas_1 = require("./view-canvas");
var view_text_1 = require("./view-text");
var controller_1 = require("./controller");
var controller_2 = require("./controller");
var autoResize = require('autoresize-textarea');
var model = new model_1.Model();
var canvasView = new view_canvas_1.View(model);
var textView = new view_text_1.View(model);
var canvasController = new controller_2.CanvasController(model, canvasView);
var textController = new controller_1.TextController(model, textView);
canvasView.setController(canvasController);
textView.setController(textController);
