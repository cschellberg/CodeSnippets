
class Counter {
    count;
    length;
    nextCounter;
    isFinished=false;

    constructor( lengthValue, nextCounterInstance = null) {
        this.count = 0;
        this.length = lengthValue;
        this.nextCounter = nextCounterInstance;
    }

    inc() {
        this.count++;
        if ( this.count >= this.length){
            this.count=0;
            if (  this.nextCounter != null){
                this.nextCounter.inc();
            } else {
                this.isFinished=true;
            }
        }
    }

    dec(){
        this.count--;
        if ( this.count < 0){
            this.count=this.length-1;
            if ( this.nextCounter != null){
                this.nextCounter.dec();
            }
        }
    }

}

class Counters {
    counters=[];

    constructor(lengthsArray) {
        if (!Array.isArray(lengthsArray) || lengthsArray.length === 0) {
           throw new Error("the array of counter lenths if of zero length or is not an array of integers")
        }

        let currentCounter = null;

        for (let i =0;i< lengthsArray.length; i++) {
            const length = lengthsArray[i];
            const newCounter = new Counter(length, currentCounter);
            this.counters.push(newCounter)
        }
        for ( let i=this.counters.length-1;i>0;i--){
            this.counters[i].nextCounter=this.counters[i-1];
        }

    }

    increment() {
       this.counters[this.counters.length-1].inc();
    }

    decrement() {
        this.counters[this.counters.length-1].dec();
    }

    getCurrentCounts() {
        let retValue=[]
        this.counters.forEach(counter=>retValue.push(counter.count))
        return retValue;
    }

    reset(){
        this.counters.forEach(counter=>{
            counter.count=0;
            counter.isFinished=false;
        });
    }

    isFinished(){
        return this.counters[0].isFinished;
    }

    isZero(){
        for ( let counter of this.counters){
            if ( counter.count > 0){
                return false;
            }
        }
        return true;
    }
}


export default Counters