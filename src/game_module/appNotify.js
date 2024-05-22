import { 
    Container, 
    Sprite, 
    Text,
    Ellipse,
    Rectangle
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
    const rect = new Rectangle(500, 200, 20, 10);

    container.addChild(text);
    //container.addChild(rect);
    return container;
}

export function updateScope(app, container, time){

}

export function pushGameover(app, container, time){

}