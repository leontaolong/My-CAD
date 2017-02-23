"use strict";
var CanvasController = (function () {
    function CanvasController(model, view) {
        this.model = model;
        this.view = view;
    }
    CanvasController.prototype.addShape = function (type, x, y) {
        this.model.addShape(type, x, y);
    };
    CanvasController.prototype.moveShape = function (shape, x, y) {
        this.model.moveShape(shape, x, y);
    };
    CanvasController.prototype.deleteShape = function (x, y) {
        this.model.deleteShape(x, y);
    };
    return CanvasController;
}());
exports.CanvasController = CanvasController;
var TextController = (function () {
    function TextController(model, view) {
        this.model = model;
        this.view = view;
    }
    TextController.prototype.modifyShape = function (shapesArray) {
        this.model.modifyShape(shapesArray);
    };
    return TextController;
}());
exports.TextController = TextController;
