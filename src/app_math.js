export function getDist(bull){
    let xx = Math.abs(bull.x - bull.mx);
    let yy = Math.abs(bull.y - bull.my);
    return Math.sqrt((xx*xx)+(yy*yy));
}
export function collide2Sprites(el, el2) 
{
    var b1 = el.getLocalBounds();
    var b2 = el2.getLocalBounds();


    return (
        b1.x < b2.x + b2.width
        && b1.x + b1.width > b2.x
        && b1.y < b2.y + b2.height
        && b1.y + b1.height > b2.y
    );
}