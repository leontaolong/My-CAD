"use strict";
/**
 * A class to represent the View. Contains control buttons and an HTML5 canvas.
 */
class View {
    constructor(model) {
        this.model = model;
        //constants for access
        this.canvas = $('#graphics-view canvas')[0];
        this.brush = this.canvas.getContext('2d'); //will be correctly typed!
        //event listeners (DOM for readability/speed)
        this.canvas.addEventListener('mousedown', (e) => { this.handleMouseDown(e); });
        this.canvas.addEventListener('mouseup', (e) => { this.handleMouseUp(e); });
        this.canvas.addEventListener('mousemove', (e) => { this.handleMove(e); });
        //register self (delegation!) 
        model.registerObserver(this);
        let optionButtons = $("#graphics-view input:radio");
        this.action = optionButtons.val(); //current (initial) selection    
        optionButtons.change((e) => { this.action = $(e.target).val(); console.log(this.action); }); //update action
        //responsive canvas
        $(window).resize(() => { this.resizeCanvas(); }); //call function on window resize
        this.resizeCanvas(); //initial sizing
    }
    display() {
        //erase canvas
        this.brush.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let shapes = this.model.getShapes(); //read from the model
        //draw all the shapes!
        for (let shape of shapes) {
            shape.draw(this.brush);
        }
    }
    handleMouseDown(event) {
        let x = event.offsetX;
        let y = event.offsetY;
        if (this.action === 'move') {
            this.selected = this.model.getShapeAt(x, y);
        }
        else if (this.action === 'delete') {
            this.model.deleteShape(x, y);
        }
        else {
            this.model.addShape(this.action, x, y);
        }
    }
    handleMouseUp(event) {
        this.selected = undefined;
    }
    handleMove(event) {
        let x = event.offsetX;
        let y = event.offsetY;
        if (this.selected) {
        }
    }
    //make Canvas responsive (adapted from http://ameijer.nl/2011/08/resizable-html5-canvas/)
    resizeCanvas() {
        const ratio = 1; //4/3;
        let canvasElem = $(this.canvas);
        canvasElem.attr('width', canvasElem.parent().width());
        canvasElem.attr('height', ratio * canvasElem.width());
        this.display();
    }
    /* Observer interface */
    update() {
        this.display();
    }
}
exports.View = View;
