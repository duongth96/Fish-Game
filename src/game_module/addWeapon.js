import { Container, Sprite } from 'pixi.js';
const assets = ['bull1','bull2','bull3'];
export function initWeapon(app){
    const weaponContainer = new Container();
    app.stage.addChild(weaponContainer);
    return weaponContainer;
}
export function shoot(app, fish, weaponContainer, bulls){

    if(fish.lastShoot == null || fish.lastShoot == undefined || (Date.parse(Date())-fish.lastShoot)>3000){
        var pos = Math.round(Math.random()*(assets.length-1));
        var newBull = Sprite.from(assets[pos]);

        fish.lastShoot =  Date.parse(Date());
        //
        newBull.direction = fish.direction;
        newBull.speed = fish.speed + 4;

        newBull.x = fish.x;
        newBull.y = fish.y;
        newBull.mx = fish.x;
        newBull.my = fish.y;
        newBull.fish = fish;

        weaponContainer.addChild(newBull);
        bulls.push(newBull);
    }
}
export function updateShoot(app, bulls){
    for(let bull of bulls){
        if(getDist(bull) > 800){
            bull.destroy();
            bulls.splice(bulls.indexOf(bull), 1);
        }else{
            bull.x += Math.sin(bull.direction) * bull.speed;
            bull.y += Math.cos(bull.direction) * bull.speed;
        }
        
    }
}

export function shootGoal(app, fishes, bulls){
    for(let fish of fishes){
        for(let bull of bulls){
            if(bull.fish == fish) continue;
            var goal = getDist({x:fish.x, y:fish.y, mx:bull.x, my:bull.y});
            if(goal<20){
                console.log("goal", fish);
                bull.destroy();
                bulls.splice(bulls.indexOf(bull), 1);

                fish.destroy();
                fishes.splice(fishes.indexOf(fish), 1);

            }
        }
    }
}

function getDist(bull){
    let xx = Math.abs(bull.x - bull.mx);
    let yy = Math.abs(bull.y - bull.my);
    return Math.sqrt((xx*xx)+(yy*yy));
}