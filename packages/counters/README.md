# JavaScript Mixed-Radix Counter

## The Counter Class (The Single Digit)

The Counter class represents a single position or "digit" in the overall counting system.

**Role:** Manages the state and rollover logic for its specific position.

## Key Properties:

**count:** The counter's current value (starts at 0).

**length:** The maximum value the counter can reach before rolling over (its radix or base).

**nextCounter:** A reference to the counter instance that must be incremented or decremented when this counter rolls over or under.

## Key Methods:

**inc():** Increments the count. If the count reaches length, it resets to 0 and triggers the inc() method on the nextCounter.

**dec():** Decrements the count. If the count drops below 0, it resets to length - 1 and triggers the dec() method on the nextCounter.

## The Counters Class (The Odometer System)
The Counters class acts as the main interface, managing the entire chained sequence of Counter objects.

**Role:** Initializes the counter chain and provides high-level methods to control the system.

**Constructor:**  Takes an array of integers (lengthsArray). The order is critical:

The first length in the array corresponds to the most significant counter (like the left-most digit).

The last length corresponds to the least significant counter (like the right-most digit, which changes most frequently).

Key Methods:

**increment():** Starts the count by calling inc() on the least significant counter.

**decrement():** Starts the reverse count by calling dec() on the least significant counter.

**getCurrentCounts():** Returns an array representing the current state of the entire counter chain.

**isFinished():** Returns true when the most significant counter has completed its full cycle (meaning the entire sequence has been exhausted).

**isZero():** Returns true if every single counter in the chain is currently at 0.

## Use Case and Application
The code effectively implements a flexible, multi-level iterator.

### Example:

For new Counters([3, 4, 3]):

It creates a three-position system.

The total number of states is the product of the lengths: 3×4×3=36 unique combinations.

The counter sequence would look like this:

Start: [0, 0, 0]

...

The sequence steps through all combinations until the final state: [2, 3, 2]

This implementation is ideal for applications requiring:

Generating permutations or combinations across multiple sets of different sizes.

Implementing nested loops with varying iteration limits.

Modeling time or other units that use a mixed-radix system (e.g., Days/30,Hours/24,Minutes/60,Seconds/60).

## Example

There is an html final that can demo the counter.  It is called
counterDemo.html
