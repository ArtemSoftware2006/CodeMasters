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

const input  = document.querySelector('dsf');
const value1 = (input as HTMLInputElement).value
