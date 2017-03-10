"use strict";
var View = (function () {
    function View(model) {
        var _this = this;
        this.model = model;
        //register self (delegation!) 
        model.registerObserver(this);
        document.getElementById("update-button").addEventListener('click', function (e) { _this.handleUpdate(e); });
    }
    View.prototype.setController = function (controller) {
        this.controller = controller;
    };
    View.prototype.update = function (shapes) {
        var shapeText = "";
        for (var i = 0; i < shapes.length; i++)
            shapeText += JSON.stringify(shapes[i]) + '\n';
        $("#shape-text").val(shapeText);
        $('#shape-text').each(function () {
            this.setAttribute('rows', "" + shapes.length);
        });
    };
    View.prototype.modifyShape = function () {
    };
    View.prototype.handleUpdate = function (event) {
        var shapeText = $("#shape-text").val().split('\n');
        shapeText = shapeText.slice(0, shapeText.length - 1);
        this.controller.modifyShape(shapeText);
    };
    return View;
}());
exports.View = View;
