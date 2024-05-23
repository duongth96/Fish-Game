import { Container, Sprite, Rectangle } from 'pixi.js';
import { getDist, collide2Sprites } from '../app_math';
import {addDisplacementEffectSprite}from './addDisplacementEffect'; 

const fishAssets = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5'];

/// multi
export function addFishes(app, fishes, fishCount = 2)
{
    // Create a container to hold all the fish sprites.
    const fishContainer = new Container();

    // Add the fish container to the stage.
    app.stage.addChild(fishContainer);

    

    // Create a fish sprite for each fish.
    for (let i = 0; i < fishCount; i++)
    {
        // Cycle through the fish assets for each sprite.
        const fishAsset = fishAssets[i % fishAssets.length];

        // Create a fish sprite.
        const fish = Sprite.from(fishAsset);

        // Center the sprite anchor.
        fish.anchor.set(0.5);

        // Assign additional properties for the animation.
        fish.direction = Math.random() * Math.PI * 2;
        fish.speed = 2 //+ Math.random() * 2;
        fish.turnSpeed = Math.random() - 0.8;

        // Randomly position the fish sprite around the stage.
        fish.x = Math.random() * app.screen.width;
        fish.y = Math.random() * app.screen.height;

        // Randomly scale the fish sprite to create some variety.
        fish.scale.set(0.5 + Math.random() * 0.2);

        // Add the fish sprite to the fish container.
        fishContainer.addChild(fish);

        // Add the fish sprite to the fish array.
        fishes.push(fish);
    }

    return fishContainer;
}
export function animateFishes(app, fishes, time)
{
    // Extract the delta time from the Ticker object.
    const delta = time.deltaTime;

    // Define the padding around the stage where fishes are considered out of sight.
    const stagePadding = 100;
    const boundWidth = app.screen.width + stagePadding * 2;
    const boundHeight = app.screen.height + stagePadding * 2;

    // Iterate through each fish sprite.
    fishes.forEach((fish) =>
    {   
        // Animate the fish movement direction according to the turn speed.
        fish.direction += fish.turnSpeed * 0.01;

        // Animate the fish position according to the direction and speed.
        fish.x += Math.sin(fish.direction) * fish.speed;
        fish.y += Math.cos(fish.direction) * fish.speed;

        // Apply the fish rotation according to the direction.
        fish.rotation = -fish.direction - Math.PI / 2;

        // Wrap the fish position when it goes out of bounds.
        if (fish.x < -stagePadding)
        {
            fish.x += boundWidth;
        }
        if (fish.x > app.screen.width + stagePadding)
        {
            fish.x -= boundWidth;
        }
        if (fish.y < -stagePadding)
        {
            fish.y += boundHeight;
        }
        if (fish.y > app.screen.height + stagePadding)
        {
            fish.y -= boundHeight;
        }
    });
}

/// one
export function addFish(app, fishes)
{
    // Create a container to hold all the fish sprites.
    const fishContainer = new Container();

    // Add the fish container to the stage.
    app.stage.addChild(fishContainer);

    var pos = Math.round(Math.random()*(fishAssets.length-1));
    const fishAsset = fishAssets[pos];

    // Create a fish sprite.
    const fish = Sprite.from(fishAsset);

    // Center the sprite anchor.
    fish.anchor.set(0.5);

    // Assign additional properties for the animation.
    fish.direction = Math.random() * Math.PI * 2;
    fish.speed = 2 //+ Math.random() * 2;
    fish.turnSpeed = Math.random() - 0.8;
    fish.me = true;

    // Randomly position the fish sprite around the stage.
    fish.x = Math.random() * app.screen.width;
    fish.y = Math.random() * app.screen.height;

    fish.x = app.screen.width/2;
    fish.y = app.screen.height/2;


    // Randomly scale the fish sprite to create some variety.
    fish.scale.set(0.5 + Math.random() * 0.2);

    // Add the fish sprite to the fish container.
    fishContainer.addChild(fish);
    // Add the fish sprite to the fish array.
    fishes.push(fish);
}
export function controlFish(app, fish, time, num)
{
    if(!fish.me) return;

    // Extract the delta time from the Ticker object.
    const delta = time.deltaTime;

    // Define the padding around the stage where fishes are considered out of sight.
    const stagePadding = 100;
    const boundWidth = app.screen.width + stagePadding * 2;
    const boundHeight = app.screen.height + stagePadding * 2;

    // control
    fish.direction = num;
    
    fish.x += Math.sin(fish.direction) * fish.speed;
    fish.y += Math.cos(fish.direction) * fish.speed;
    fish.rotation = -fish.direction - Math.PI / 2;

    // Wrap the fish position when it goes out of bounds.
    if (fish.x < -stagePadding)
    {
        fish.x += boundWidth;
    }
    if (fish.x > app.screen.width + stagePadding)
    {
        fish.x -= boundWidth;
    }
    if (fish.y < -stagePadding)
    {
        fish.y += boundHeight;
    }
    if (fish.y > app.screen.height + stagePadding)
    {
        fish.y -= boundHeight;
    }
}

export function collideFishes(app, fishes, time){
    const desFish = [];
    for(let f1 of fishes){
        for(let f2 of fishes){
            if(f1 === f2) continue;
            var goal = getDist({x:f1.x, y:f1.y, mx:f2.x, my:f2.y});
            if(goal<30){
                f1.x=f1.y=-100;
                f2.x=f2.y=-100;

                console.log(f1.getLocalBounds());
                console.log(f2.getLocalBounds());

                fishes.splice(fishes.indexOf(f1), 1);
                fishes.splice(fishes.indexOf(f2), 1);
                
            }

            // var b1 = f1.getLocalBounds();
            // var b2 = f2.getLocalBounds();
            // if(b1.rectangle.contains(b2.x, b2.y)){
            //     //console.log("overlap", b1, b2);
            //     f1.x=f1.y=-100;
            //     f2.x=f2.y=-100;
            //     fishes.splice(fishes.indexOf(f1), 1);
            //     fishes.splice(fishes.indexOf(f2), 1);
            // }
            

            // if(f1.containsPoint(f2)){
            //     f1.x=f1.y=-100;
            //     f2.x=f2.y=-100;
            //     fishes.splice(fishes.indexOf(f1), 1);
            //     fishes.splice(fishes.indexOf(f2), 1);
            // }

        }
    }
}
