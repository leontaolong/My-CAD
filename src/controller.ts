interface CanvasSetter {
    addShape();
    deleteShape();
}

interface TextSetter {
    editShape();
}

class CanvasView implements CanvasSetter{
    addShape(){

    }

    deleteShape(){

    }

}

class TextView implements TextSetter{
    
    editShape(){

    }

}