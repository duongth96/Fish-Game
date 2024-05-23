import { 
    Container, 
    Sprite, 
    Text,
    Ellipse,
    Rectangle,
    Graphics
} from 'pixi.js';

export function initNotify(app){
    var container = new Container();
    app.stage.addChild(container);

    const text = new Text({
        text:'hello',
        style:{
          fontFamily:'arial',
          fontSize:24,
          fill : 0xffffff
        }
    });
    

    container.addChild(text);
    
    return container;
}

export function updateScope(app, container, time){

}

export function pushGameover(app, container, time){

}