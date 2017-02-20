"use strict";
require("bootstrap"); //bootstrap.js for button toggling
var model_1 = require("./model");
var view_canvas_1 = require("./view-canvas");
var view_text_1 = require("./view-text");
var model = new model_1.Model();
var canvasView = new view_canvas_1.View(model);
var textView = new view_text_1.View(model);
// let ctrl:Controller = new Controller(); 
