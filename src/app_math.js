export function getDist(bull){
    let xx = Math.abs(bull.x - bull.mx);
    let yy = Math.abs(bull.y - bull.my);
    return Math.sqrt((xx*xx)+(yy*yy));
}