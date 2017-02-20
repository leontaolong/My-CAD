"use strict";
var CanvasController = (function () {
    function CanvasController(model, view) {
        this.model = model;
        this.view = view;
    }
    CanvasController.prototype.addShape = function () {
    };
    CanvasController.prototype.modifyShape = function () {
    };
    CanvasController.prototype.moveShape = function () {
    };
    CanvasController.prototype.deleteShape = function () {
    };
    return CanvasController;
}());
exports.CanvasController = CanvasController;
var TextController = (function () {
    function TextController(model, view) {
        this.model = model;
        this.view = view;
    }
    TextController.prototype.addShape = function () {
    };
    TextController.prototype.modifyShape = function () {
    };
    TextController.prototype.moveShape = function () {
    };
    TextController.prototype.deleteShape = function () {
    };
    return TextController;
}());
exports.TextController = TextController;
