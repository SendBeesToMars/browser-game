
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
    order_num = 0;  // number of orders*
    load_flag: boolean = false;
    timer:boolean = true;
    initial: number = 0;
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

function progressbar_load(progressbar, progress, order_num) { // idea behind this is that it takes time to move the items to invenotry after buying
    setTimeout(() => {
        progressbar.value = progress.toString();
        if (progress < 100) { // 100%
            progressbar_load(progressbar, progress + 1, order_num);
        }
        else {
            progressbar.value = "0";
            point.num += order_num;
            update();
            point.timer = true;
            
            console.log(point.initial, point.order_num)
            if (point.initial != point.order_num) {
                point.order_num -= point.initial;
                point.initial = order_num;
                progressbar_load(point_progress_element, 0, point.order_num);
            }
            point.order_num = 0;
            point.initial = 0;
        }
    }, 25); // time to wait
}

function buy_point() {
    if (money.num > 0) {
        money.num --;
        update();
        point.order_num++;

        setTimeout(() => {
            if (point.timer) {
                point.timer = false;
                point.initial = point.order_num;
                progressbar_load(point_progress_element, 0, point.order_num);
            }
        }, 1000);
    }
}

function make_eyes() {

}