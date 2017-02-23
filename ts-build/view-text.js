"use strict";
var View = (function () {
    function View(model) {
        this.model = model;
        //register self (delegation!) 
        model.registerObserver(this);
    }
    View.prototype.setController = function (controller) {
        this.controller = controller;
    };
    View.prototype.update = function (shapes) {
        var shapeText = "";
        for (var i = 0; i < shapes.length; i++)
            shapeText += JSON.stringify(shapes[i]) + '\n';
        $("#shape-text").val(shapeText);
    };
    View.prototype.modifyShape = function () {
    };
    return View;
}());
exports.View = View;
