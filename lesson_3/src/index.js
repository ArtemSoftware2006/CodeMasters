"use strict";
let test = null;
let und = undefined;
const textBold = {
    "bold": 500,
    "bolder": 600,
    "boldest": 700,
};
var Status;
(function (Status) {
    Status[Status["Ok"] = 200] = "Ok";
    Status[Status["Error"] = 500] = "Error";
    Status[Status["NotFound"] = 404] = "NotFound";
})(Status || (Status = {}));
class Car {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getInfo() {
        return `${this.name} : ${this.price}`;
    }
}
class ElectroCar extends Car {
    constructor(name, price, tok) {
        super(name, price);
        this.tok = tok;
    }
}
//Миксины - множественное наследование
//
//const input  = document.querySelector('dsf');
//const value1 = (input as HTMLInputElement).value
class Queue {
    constructor(id) {
        this.data = [];
        this.push = (item) => this.data.push(item);
        this.pop = () => this.data.shift();
        this.Id = id;
    }
    get GetData() {
        return this.data;
    }
}
//Базовые типы
let isFetching = true;
let number = 100;
let floatNumber = 3.5;
let string = "12312dsfs";
//Массивы
let array = ["fsd", "fsdf", "fsdf"];
let array2 = [1, 2, 3, 4, 5];
//Touple - массив нескольких типов данных
let contacts = ["Artem", 1234];
let variable = 33;
variable = "dasd";
//Функции, возращаемый тип, тип параметров
function getName(name) {
    return name;
}
//Тип never 
function throwError() {
    console.error("ERORR");
    throw new Error("ERROR");
}
function funcWhileTrue() {
    while (true) {
    }
}
let id1 = "1312";
let id2 = 12312;
const rect1 = {
    id: '123',
    size: {
        width: 12,
        height: 20
    }
};
//rect1 - константа, но мы можем изменять её внутреннее состояние
//Нельзя использовать знак "=" с const
rect1.color = "000000";
//Приведение типов
let rect2 = {};
let rect3 = {};
let rectArea = {
    id: '123',
    size: {
        width: 12,
        height: 100
    },
    getArea() {
        return this.size.width * this.size.height;
    },
};
class Clock {
    constructor() {
        this.time = new Date();
    }
    setTime(date) {
        this.time = date;
    }
}
const css = {
    border: '1px solid black',
    marginTop: '2px',
    borderRadius: '5px'
};
//Enum
var Roles;
(function (Roles) {
    Roles[Roles["User"] = 0] = "User";
    Roles[Roles["Admin"] = 1] = "Admin";
    Roles[Roles["Manager"] = 2] = "Manager";
})(Roles || (Roles = {}));
let userRole = Roles.Admin;
let userRoleReverse = Roles[1];
console.log(userRoleReverse);
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Success"] = 200] = "Success";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["NotForien"] = 403] = "NotForien";
    StatusCode[StatusCode["ServerError"] = 500] = "ServerError";
})(StatusCode || (StatusCode = {}));
var SocialMedia;
(function (SocialMedia) {
    SocialMedia["Vk"] = "VK";
    SocialMedia["Twitter"] = "Twitter";
    SocialMedia["Watsapp"] = "Watsapp";
})(SocialMedia || (SocialMedia = {}));
//Функции
function add(a, b) {
    return a + b;
}
function toUpperCase(str) {
    return str.trim().toUpperCase();
}
function position(x, y) {
    if (!x && !y) {
        return {
            x: undefined,
            y: undefined
        };
    }
    return {
        x: x,
        y: y
    };
}
console.log(position());
console.log(position(12, 12));
//Классы
class Typescript {
    constructor(version) {
        this.version = version;
    }
    getVersion() {
        return this.version;
    }
}
class Bus {
    constructor(model, numberPassangers) {
        this.model = model;
        this.numberPassangers = numberPassangers;
    }
}
//Модификаторы доступа
class Animal {
    constructor() {
        this.name = "";
        this.voice = "";
    }
    getName() {
        return this.name;
    }
}
class Cat extends Animal {
    constructor(voice) {
        super();
        this.voice = voice;
    }
}
//Абстракстные классы
class Component {
}
class AppComponent extends Component {
    render() {
        console.log("RENDER");
    }
    info() {
        return "INFO";
    }
}
//Guards
function strip(x) {
    if (typeof x === 'number') {
        return x.toFixed(2);
    }
    return x.trim();
}
class MyResponse {
    constructor() {
        this.headers = [];
        this.body = "";
    }
}
class MyError {
    constructor() {
        this.headers = [];
        this.message = "";
    }
}
function handle(res) {
    if (res instanceof MyResponse) {
        return res.headers.concat() + " " + res.body;
    }
    return res.headers.concat() + " " + res.message;
}
function setAlertType(type) {
}
//Generic
const arrayUsers = [12, 22, 33, 56];
function reverse(array) {
    return array.reverse();
}
console.log(reverse(arrayUsers));
