
// make ) from | 
// make : from .
// from ..| => :)

console.log("suh");

const money_element: HTMLElement = document.getElementById("money");
const period_element: HTMLElement = document.getElementById("period");
const eyes_element: HTMLElement = document.getElementById("eyes");
const pipe_element: HTMLElement = document.getElementById("pipe");
const cbracket_element: HTMLElement = document.getElementById("cbracket");
const smile_element: HTMLElement = document.getElementById("smile");


const period_progress_element: HTMLInputElement = document.getElementById("period_progress") as HTMLInputElement;
const eyes_progress_element: HTMLInputElement = document.getElementById("eyes_progress") as HTMLInputElement;
const pipe_progress_element: HTMLInputElement = document.getElementById("pipe_progress") as HTMLInputElement;
const cbracket_progress_element: HTMLInputElement = document.getElementById("cbracket_progress") as HTMLInputElement;
const smile_progress_element: HTMLInputElement = document.getElementById("smile_progress") as HTMLInputElement;

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

class Part {
    num: number = 0;
    growth_freq: number = 1000;
    order_num = 0;  // number of orders*
    load_flag: boolean = false;
    timer:boolean = true;
    initial: number = 0;
}

let money: Money = new Money()
let period: Part = new Part()
let pipe: Part = new Part()
let eyes: Part = new Part()
let cbracket: Part = new Part()
let smile: Part = new Part()

function update() { // updates the html
    money_element.textContent = "cash money: $" + money.num.toString();
    period_element.textContent = "count: " + period.num.toString();
    eyes_element.textContent = "count: " + eyes.num.toString();
    pipe_element.textContent = "count: " + pipe.num.toString();
    cbracket_element.textContent = "count: " + cbracket.num.toString();
    smile_element.textContent = "count: " + smile.num.toString();
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

// idea behind this is that it takes time to move the items to invenotry after buying
function progressbar_load_wait(item, progressbar, progress, order_num) { 
    setTimeout(() => { // self calling timeout to increment the loading bar progress
        progressbar.value = progress.toString();
        if (progress < 100) { // 100%
            progressbar_load_wait(item, progressbar, progress + 1, order_num);
        }
        else {
            progressbar.value = "0";
            item.num += order_num;
            update();
            item.timer = true;
            
            // if there is a backlog of orders run them in series
            if (item.initial != item.order_num && item.timer) {
                item.timer = false;
                item.order_num -= item.initial;
                item.initial = order_num;
                progressbar_load_wait(item, progressbar, 0, item.order_num);
            }
            item.order_num = 0;
            item.initial = 0;
        }
    }, 25); // time to wait
}

// idea behind this is that it takes time to move the items to invenotry after buying
function progressbar_load(item, progressbar, progress) { 
    setTimeout(() => { // self calling timeout to increment the loading bar progress
        progressbar.value = progress.toString();
        if (progress < 100) { // 100%
            progressbar_load(item, progressbar, progress + 1);
        }
        else {
            progressbar.value = "0";
            item.num ++;
            update();
            item.load_flag = false;
        }
    }, 50); // time to wait
}

function buy_period() {
    if (money.num > 0) {
        money.num --;
        update();
        period.order_num++;

        setTimeout(() => {
            if (period.timer) {
                period.timer = false;
                period.initial = period.order_num;
                progressbar_load_wait(period, period_progress_element, 0, period.order_num);
            }
        }, 1000);
    }
}

function buy_pipe() {
    if (money.num > 0) {
        money.num --;
        update();
        pipe.order_num++;

        setTimeout(() => {
            if (pipe.timer) {
                pipe.timer = false;
                pipe.initial = pipe.order_num;
                progressbar_load_wait(pipe, pipe_progress_element, 0, pipe.order_num);
            }
        }, 1000);
    }
}

function forge_eyes() {
    if (period.num >= 2 && !eyes.load_flag) {
        eyes.load_flag = true;
        period.num -=2;
        update();
        progressbar_load(eyes, eyes_progress_element, 0);
    }
}

function forge_cbracket() {
    if (pipe.num >= 2 && !cbracket.load_flag) {
        cbracket.load_flag = true;
        pipe.num -=2;
        update();
        progressbar_load(cbracket, cbracket_progress_element, 0);
    }
}

function combine_smile() {
    if (eyes.num >= 1 &&  cbracket.num >= 1 && !smile.load_flag) {
        smile.load_flag = true;
        eyes.num -=1;
        cbracket.num -=1;
        update();
        progressbar_load(smile, smile_progress_element, 0);
    }
}