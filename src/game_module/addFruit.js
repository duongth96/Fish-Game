import { Container, Sprite } from 'pixi.js';

export function addFuits(app, fruits){
    const fruitContainer = new Container();

    app.stage.addChild(fruitContainer);

    const fruitCount = 10;
    const fAssets = ['fruit1', 'fruit2', 'fruit3'];

    for (let i = 0; i < fruitCount; i++)
    {
        // Cycle through the fish assets for each sprite.
        const fAsset = fAssets[i % fAssets.length];

        // Create a fish sprite.
        const fruit = Sprite.from(fAsset);

        // Center the sprite anchor.
        //fruit.anchor.set(0.5);

        fruit.x = Math.random() * app.screen.width;
        fruit.y = Math.random() * app.screen.height;

        // fish.scale.set(0.5 + Math.random() * 0.2);

        fruitContainer.addChild(fruit);

        fruits.push(fruit);
    }
}

export function updateFuits(app, fruits, fish, time){
    let count = fruits.length;
    for (let i = 0; i < count; i++){

        var fruit = fruits[i];

        const matchX = fruit.x - fish.x;
        const matchY = fruit.y - fish.y;

        console.log(fruit);
        
        if(matchX<=10 && matchY<=10){
            fruit.x = -100;
            fruit.y = -100;
        }
    }
}