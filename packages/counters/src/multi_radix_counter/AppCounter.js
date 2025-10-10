import Counters from './Counters.js'

console.log("Just to show how use Counters")

let counters=new Counters([3,4,3]);
console.log("Incrementing ..."+counters.getCurrentCounts());
while ( !counters.isFinished()){
    console.log(counters.getCurrentCounts());
    counters.increment();
}
counters.decrement();
console.log("Decrementing ..."+counters.getCurrentCounts());
while (!counters.isZero()){
    console.log(counters.getCurrentCounts());
    counters.decrement();
}