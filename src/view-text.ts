import {Model} from './model';
import {Shape} from './shapes';
import {TextController} from './controller';

export class View implements Observer{
    private controller:TextController;

    constructor(private model:Model){
        //register self (delegation!) 
        model.registerObserver(this);
    }
    setController(controller:TextController) {
        this.controller = controller;
    }

    update(shapes: Shape[]) {
        let shapeText:string = "";
        for (let i = 0; i < shapes.length; i++)
             shapeText+= JSON.stringify(shapes[i]) + '\n';
        $("#shape-text").val(shapeText);
    }

    modifyShape() {

    }
}

//Behaviors for Observers (subscribers)
export interface Observer {
    update(shapes: Shape[]):void;
}