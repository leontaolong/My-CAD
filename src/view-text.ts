import { Model } from './model';
import { Shape } from './shapes';
import { TextController } from './controller';

export class View implements Observer {
    private controller: TextController;

    constructor(private model: Model) {
        //register self (delegation!) 
        model.registerObserver(this);
        document.getElementById("update-button").addEventListener('click', (e) => { this.handleUpdate(e) });
    }
    setController(controller: TextController) {
        this.controller = controller;
    }

    update(shapes: Shape[]) {
        let shapeText: string = "";
        for (let i = 0; i < shapes.length; i++)
            shapeText += JSON.stringify(shapes[i]) + '\n';
        $("#shape-text").val(shapeText);
        $('#shape-text').each(function () {
            this.setAttribute('rows', "" + shapes.length);
        });
    }

    modifyShape() {

    }

    handleUpdate(event: MouseEvent) {
        var shapeText = $("#shape-text").val().split('\n')
        shapeText = shapeText.slice(0, shapeText.length -1);
        this.controller.modifyShape(shapeText);
    }
}

//Behaviors for Observers (subscribers)
export interface Observer {
    update(shapes: Shape[]): void;
}