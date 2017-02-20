"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var shapes_1 = require("./shapes");
/**
 * The CAD drawing model currently being created
 */
var Model = (function () {
    function Model() {
        this.observers = [];
        this.shapes = [];
    }
    Model.prototype.getShapes = function () {
        return this.shapes;
    };
    Model.prototype.getShapeAt = function (x, y) {
        var found;
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            if (shape.contains(x, y)) {
                found = shape;
            }
        }
        return found; //return last shape
    };
    Model.prototype.addShape = function (type, x, y) {
        if (type != null) {
            var makeShape = new ShapeFactory();
            var newShape = void 0;
            switch (type) {
                case "circle":
                    newShape = makeShape.createCircle(x, y);
                    break;
                case "rectangle":
                    newShape = makeShape.createRectangle(x, y);
                    break;
                case "triangle":
                    newShape = makeShape.createTriangle(x, y);
                    break;
                default:
                    console.log("invalid shape type");
            }
            this.shapes.push(newShape);
            this.notifyAll();
        }
    };
    Model.prototype.deleteShape = function (x, y) {
        var _this = this;
        this.shapes = this.shapes.filter(function (shape) { return shape !== _this.getShapeAt(x, y); });
        this.notifyAll();
    };
    Model.prototype.modifyShape = function () {
    };
    /* implement Subject interface */
    Model.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    Model.prototype.removeObserver = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs !== observer; });
    };
    Model.prototype.notifyAll = function () {
        var _this = this;
        this.observers.forEach(function (observer) {
            observer.update(_this.shapes);
        });
    };
    return Model;
}());
exports.Model = Model;
//an interface for a complex factory
var Factory = (function () {
    function Factory() {
    }
    return Factory;
}());
//a concrete class that implements the Factory
var ShapeFactory = (function (_super) {
    __extends(ShapeFactory, _super);
    function ShapeFactory() {
        var _this = _super.call(this) || this;
        _this.CIRCLE_RADIUS = 60;
        _this.RECT_WIDTH = 50;
        _this.RECT_HEIGHT = 30;
        _this.TRIAN_HEIGHT = 40;
        _this.TRIAN_EDGE = 40;
        return _this;
    }
    ShapeFactory.prototype.createCircle = function (cx, cy) {
        return new shapes_1.Circle(cx, cy, this.CIRCLE_RADIUS);
    };
    ShapeFactory.prototype.createTriangle = function (cx, cy) {
        return new shapes_1.Triangle(cy, cy + 0.5 * this.TRIAN_HEIGHT, cx - 0.5 * this.TRIAN_EDGE, cy, cx + 0.5 * this.TRIAN_EDGE, cy);
    };
    ShapeFactory.prototype.createRectangle = function (cx, cy) {
        return new shapes_1.Rectangle(cx, cy, this.RECT_WIDTH, this.TRIAN_EDGE);
    };
    return ShapeFactory;
}(Factory));
