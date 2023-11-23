let test : null = null
let und : undefined = undefined;

interface Keys  {
    User : number;
    [key : string] : number
}

type TextBold = {"bold" : number, "bolder" : number, "boldest" : number};

const textBold : TextBold = {
    "bold" : 500,
    "bolder" : 600,
    "boldest" : 700,
} 

enum Status {
    Ok = 200,
    Error = 500,
    NotFound = 404,
}

class Car {
    public price : number
    private name : string

    constructor(name : string, price : number) {
        this.name = name
        this.price = price
    }

    public getInfo() {
        return `${this.name} : ${this.price}`
    }
}
class ElectroCar extends Car {
    public tok : string

    constructor(name : string, price : number, tok : string) {
        super(name, price);
        this.tok = tok
    }
}

//Миксины - множественное наследование

//

//const input  = document.querySelector('dsf');
//const value1 = (input as HTMLInputElement).value

class Queue<T> {
    private readonly Id : number 
    private data : T[] = [];

    constructor(id : number) {
        this.Id = id;
    }

    get GetData() : T[] {
        return this.data;
    }

    push = (item : T) => this.data.push(item)
    pop = () => this.data.shift()
}





//Базовые типы

let isFetching : boolean = true;
let number : number = 100;
let floatNumber : number = 3.5;
let string : string = "12312dsfs";

//Массивы
let array : string[] = ["fsd", "fsdf", "fsdf"];
let array2 : Array<number> = [1, 2, 3, 4, 5]

//Touple - массив нескольких типов данных
let contacts : [string, number] = ["Artem", 1234]

let variable : any = 33;
variable = "dasd";

//Функции, возращаемый тип, тип параметров
function getName(name : string) : string {
    return name
}

//Тип never 
function throwError() : never{
    console.error("ERORR")
    throw new Error("ERROR")
}
function funcWhileTrue() : never{
    while(true) {

    }
}

//Type - собсвтенные типы
type Login = {
    username : string
    password : string
}

type Id = string | number

let id1 : Id = "1312"
let id2 : Id = 12312

//Null/Undefined

type SomeType = string | null

//Interfaces

interface Rect {
    //Только для чтения
    readonly id : string,
    //Необязательный параметр
    color? : string,
    size : {
        width : number,
        height : number
    }
}

const rect1 : Rect = {
    id : '123',
    size : {
        width : 12,
        height : 20
    }
} 

//rect1 - константа, но мы можем изменять её внутреннее состояние
//Нельзя использовать знак "=" с const
rect1.color = "000000"

//Приведение типов
let rect2 = {} as Rect
let rect3 = <Rect>{}

//Наследование интерфейсов

interface ReactWithArea extends Rect {
    getArea: () => number
}

let rectArea : ReactWithArea = {
    id : '123',
    size : {
        width : 12,
        height : 100
    },
    getArea() : number {
        return this.size.width * this.size.height
    },
} 

interface IClock {
    time : Date
    setTime(date : Date) : void
}

class Clock implements IClock {
    time: Date = new Date();
    setTime(date: Date): void {
        this.time = date
    }
}

//Множественное количество свойств в интерфейсе
interface Styles {
    [key : string] : string
}

const css : Styles = {
    border : '1px solid black',
    marginTop : '2px',
    borderRadius : '5px'
}

//Enum

enum Roles {
    User,
    Admin,
    Manager
}

let userRole = Roles.Admin
let userRoleReverse = Roles[1]

console.log(userRoleReverse)

enum StatusCode {
    Success = 200,
    NotFound = 404,
    NotForien = 403,
    ServerError = 500
}

enum SocialMedia {
    Vk = "VK",
    Twitter = "Twitter",
    Watsapp = "Watsapp"
}

//Функции
function add(a : number, b : number) : number {
    return a + b
}

function toUpperCase(str : string) : string {
    return str.trim().toUpperCase()
}

//Перегрузка функций
interface Position {
    x : number | undefined,
    y : number | undefined
}

function position() : Position 
function position(x : number, y : number ) : Position

function position(x? : number, y? : number) {
    if (!x && !y) {
        return {
            x : undefined,
            y : undefined
        }
    }

    return {
        x : x,
        y : y
    }
}

console.log(position())
console.log(position(12, 12))

//Классы

class Typescript {
    private version : string

    constructor(version : string) {
        this.version = version
    }

    public getVersion() : string {
        return this.version
    }
}

class Bus {
    readonly model : string
    readonly numberPassangers : number

    constructor(model : string, numberPassangers : number) {
        this.model = model
        this.numberPassangers = numberPassangers
    }

    //Автоматическое создание readonly свойств через конструктор
    //constructor(readonly yearCreated : number) {}
}

//Модификаторы доступа
class Animal {
    private name : string = ""
    public getName() : string {
        return this.name
    }

    protected voice : string = ""
}

class Cat extends Animal {
    constructor(voice : string) {
        super()
        this.voice = voice
    }
}

//Абстракстные классы
abstract class Component {
    abstract render() : void
    abstract info() : string
}

class AppComponent extends Component {
    render(): void {
       console.log("RENDER")
    }
    info(): string {
       return "INFO"
    }
}

//Guards
function strip(x : string | number) {
    if(typeof x === 'number') {
        return x.toFixed(2)
    }
    return x.trim()
}

class MyResponse {
    headers : string[] = []
    body : string = ""
}

class MyError {
    headers : string[] = []
    message : string = "" 
}

function handle(res : MyError | MyResponse) : string {
    if(res instanceof MyResponse) {
        return res.headers.concat() + " " + res.body
    }

    return res.headers.concat() + " " + res.message
}

type AlertType = "success" | "danger" | "warning"

function setAlertType(type : AlertType) {

}

//Generic
const arrayUsers : Array<number> = [12, 22, 33, 56]

function reverse<T>(array : T[]) : T[] {
    return array.reverse()
}

console.log(reverse(arrayUsers))

//Вспомогательные операции TS

//keysof
interface Person {
    name : string,
    age : number
}

type PersonKeys = keyof Person // 'age' | 'name' 

let keys : PersonKeys = "age"

//Создание типа на основе другого типа
type User = {
    _id : number,
    name : string,
    email : string,
    createAt : Date
}

//type UserKeysNoMeta = Exclude<keyof User, '_id' | 'createAy'>
type UserKeysNoMeta = Pick<User, 'name' | "email">