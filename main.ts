
// make ) from | 
// make : from .
// from ..| => :)

console.log("suh");

const money_element: HTMLElement = document.getElementById("money");
const point_element: HTMLElement = document.getElementById("point");
const point_progress_element: HTMLInputElement = document.getElementById("point_progress") as HTMLInputElement;

interface Smiley{
    price: number; // base price
    buy_mod: number; // price modification for buying
    sell_mod: number; // price modification for selling
    quantity: number; // how much you have
    demand: number; // demand goes down as more is being bought 
}

class Happy implements Smiley {
    buy_mod: number;
    sell_mod: number;
    price: number;
    quantity: number;
    demand: number;
}

class Money {
    num: number = 10;
    growth_freq: number = 1000;
    constructor(){
        console.log("hi :)");
    }
}

class Point {
    num: number = 0;
    growth_freq: number = 1000;
}

let money: Money = new Money()
let point: Point = new Point()

function update() {
    money_element.textContent = "cash money: $" + money.num.toString();
    point_element.textContent = "count: " + point.num.toString();
}

// runs this function evey x miliseconds
function timeout() {
    setTimeout(() => {
        money.num ++;
        // money.growth_freq > 10 ? money.growth_freq -= 10 : money.growth_freq;
        update();
        timeout();
    }, money.growth_freq); // time to wait
}
timeout();

function progressbar_load(progressbar, progress) {
    setTimeout(() => {
        progressbar.value = progress.toString();
        if (progress < 100) { // 100%
            progressbar_load(progressbar, progress + 1);
        }
        else {
            progressbar.value = "0";
            point.num ++;
            update();
        }
    }, 25); // time to wait
}

function buy_point() {
    if (money.num > 0) {
        money.num --;
        update();
        progressbar_load(point_progress_element, 0);
    }
}

function make_eyes() {

}