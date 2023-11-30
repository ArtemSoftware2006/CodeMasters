export class Timer {
    private miliseconds : number;
    private isStart : boolean;
    private timer : NodeJS.Timeout | undefined;
    constructor() {
        this.miliseconds = 0;
        this.isStart = false;
    }

    public start() {
        this.isStart = true
        this.miliseconds = 0;
        this.timer = setInterval(this.tick.bind(this), 100)
    }

    public stop() {
        this.isStart = false;
        clearInterval(this.timer)

        return this.miliseconds;
    }

    public getIsStart() {
        return this.isStart
    }
    public getMiliseconds() {
        return this.miliseconds
    }

    private tick() {
        this.miliseconds += 100;
    }
    
}