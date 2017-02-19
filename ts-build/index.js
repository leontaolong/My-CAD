"use strict";
require("bootstrap"); //bootstrap.js for button toggling
const model_1 = require("./model");
const view_canvas_1 = require("./view-canvas");
let model = new model_1.Model();
let canvasView = new view_canvas_1.View(model);
//TODO: more views and controllers here... 
