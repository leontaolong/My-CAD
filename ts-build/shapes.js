/****
This module contains class declarations for different Shapes, which can be
shared between the components following OOP design principles.
****/
"use strict";
/**
 * Represents an abstract Shape
 */
class Shape {
    /**
     * Assigns the values of the given object to this shape
     * @param props An object of values to assign, where each key is the property name
     */
    updateProperties(props) {
        $.extend(this, props); //use jQuery for easy application
    }
}
exports.Shape = Shape;
/**
 * Represets a rectangle
 */
class Rectangle extends Shape {
    //cx,cy parameters are the CENTER of the rectangle
    constructor(cx, cy, width, height) {
        super();
        this.width = width;
        this.height = height;
        this.x = cx - width / 2; //calculate upper corner
        this.y = cy - height / 2;
        this.color = "red"; //default color
    }
    contains(x, y) {
        return (x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height);
    }
    setPosition(x, y) {
        //snap to middle
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }
    draw(brush) {
        brush.fillStyle = this.color;
        brush.fillRect(this.x, this.y, this.width, this.height);
    }
}
exports.Rectangle = Rectangle;
/**
 * Represents a circle
 */
class Circle extends Shape {
    constructor(cx, cy, radius) {
        super();
        this.cx = cx;
        this.cy = cy;
        this.radius = radius;
        this.color = "blue"; //default color
    }
    contains(x, y) {
        return Math.sqrt((this.cx - x) * (this.cx - x) + (this.cy - y) * (this.cy - y)) <= this.radius;
    }
    setPosition(x, y) {
        this.cx = x;
        this.cy = y;
    }
    draw(brush) {
        brush.fillStyle = this.color;
        brush.beginPath();
        brush.arc(this.cx, this.cy, this.radius, 0, 2 * Math.PI);
        brush.fill();
    }
}
exports.Circle = Circle;
/**
 * Represents a triangle
 */
class Triangle extends Shape {
    //each pair of coordinates is a corner of the triangle
    constructor(x1, y1, x2, y2, x3, y3) {
        super();
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.color = "green"; //default color
    }
    //calculate centroid of triangle
    center() {
        return [(this.x1 + this.x2 + this.x3) / 3, (this.y1 + this.y2 + this.y3) / 3];
    }
    //return area of arbitrary triangle (for calculating containment)
    static area(x1, y1, x2, y2, x3, y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    }
    contains(x, y) {
        //calculate containment via barycentric coordinates
        let A = Triangle.area(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
        let A1 = Triangle.area(x, y, this.x2, this.y2, this.x3, this.y3);
        let A2 = Triangle.area(this.x1, this.y1, x, y, this.x3, this.y3);
        let A3 = Triangle.area(this.x1, this.y1, this.x2, this.y2, x, y);
        return (Math.abs(A - (A1 + A2 + A3)) === 0);
    }
    setPosition(newX, newY) {
        //calculate displacement
        let center = this.center();
        let dx = newX - center[0];
        let dy = newY - center[1];
        //move by displacement
        this.x1 += dx;
        this.x2 += dx;
        this.x3 += dx;
        this.y1 += dy;
        this.y2 += dy;
        this.y3 += dy;
    }
    draw(brush) {
        brush.fillStyle = this.color;
        brush.beginPath();
        brush.moveTo(this.x1, this.y1);
        brush.lineTo(this.x2, this.y2);
        brush.lineTo(this.x3, this.y3);
        brush.closePath();
        brush.fill();
    }
}
exports.Triangle = Triangle;
