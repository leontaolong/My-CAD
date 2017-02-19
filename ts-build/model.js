"use strict";
const shapes_1 = require("./shapes");
/**
 * The CAD drawing model currently being created
 */
class Model {
    constructor() {
        this.observers = [];
        this.shapes = [];
    }
    getShapes() {
        return this.shapes;
    }
    getShapeAt(x, y) {
        let found;
        for (let shape of this.shapes) {
            if (shape.contains(x, y)) {
                found = shape;
            }
        }
        return found; //return last shape
    }
    addShapes(type, x, y) {
        if (type != null) {
            let makeShape = new ShapeFactory();
            let newShape;
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
        }
    }
    deleteShape(x, y) {
        this.shapes = this.shapes.filter(shape => shape !== this.getShapes(x, y));
    }
    modifyShape() {
    }
    /* implement Subject interface */
    registerObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notifyAll() {
        this.observers.forEach((observer) => {
            observer.update(this.shapes);
        });
    }
}
exports.Model = Model;
//an interface for a complex factory
class Factory {
}
//a concrete class that implements the Factory
class ShapeFactory extends Factory {
    constructor() {
        super();
        this.CIRCLE_RADIUS = 60;
        this.RECT_WIDTH = 50;
        this.RECT_HEIGHT = 30;
        this.TRIAN_HEIGHT = 40;
        this.TRIAN_EDGE = 40;
    }
    createCircle(cx, cy) {
        return new shapes_1.Circle(cx, cy, this.CIRCLE_RADIUS);
    }
    createTriangle(cx, cy) {
        return new shapes_1.Triangle(cy, cy + 0.5 * this.TRIAN_HEIGHT, cx - 0.5 * this.TRIAN_EDGE, cy, cx + 0.5 * this.TRIAN_EDGE, cy);
    }
    createRectangle(cx, cy) {
        return new shapes_1.Rectangle(cx, cy, this.RECT_WIDTH, this.TRIAN_EDGE);
    }
}
