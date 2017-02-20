import {Model} from './model';
import {DrawableShape} from './shapes';

export class View implements Observer{
    constructor(private model:Model){
        //register self (delegation!) 
        model.registerObserver(this);
    }

    update(shapes: DrawableShape[]) {

    }
}

//Behaviors for Observers (subscribers)
export interface Observer {
    update(shapes: DrawableShape[]):void;
}