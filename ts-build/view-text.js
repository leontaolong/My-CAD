"use strict";
var View = (function () {
    function View(model) {
        this.model = model;
        //register self (delegation!) 
        model.registerObserver(this);
    }
    View.prototype.update = function (shapes) {
    };
    return View;
}());
exports.View = View;
