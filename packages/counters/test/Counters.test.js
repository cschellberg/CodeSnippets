import Counters from '../src/multi_radix_counter/Counters.js';

describe('Counters', () => {
    // A [MSB, LSB] structure, like [Hours (unlimited), Minutes (60), Seconds (60)]
    // LSB (Seconds) is at index 2, MSB (Hours) is at index 0.
    const LENGTHS = [10, 5, 2]; // MSB: length 10, Mid: length 5, LSB: length 2

    // --- Constructor & Initialization Tests ---
    test('constructor should throw an error for invalid input', () => {
        expect(() => new Counters([])).toThrow("the array of counter lenths if of zero length or is not an array of integers");
        expect(() => new Counters(null)).toThrow(); // Fails Array.isArray check
    });

    test('constructor should create correct number of counters', () => {
        const countersInstance = new Counters(LENGTHS);
        expect(countersInstance.counters.length).toBe(3);
        expect(countersInstance.counters[0].length).toBe(10); // MSB
        expect(countersInstance.counters[1].length).toBe(5);
        expect(countersInstance.counters[2].length).toBe(2); // LSB
    });

    test('initial state should be [0, 0, 0] and isZero should be true', () => {
        const countersInstance = new Counters(LENGTHS);
        expect(countersInstance.getCurrentCounts()).toEqual([0, 0, 0]);
        expect(countersInstance.isZero()).toBe(true);
    });

    // --- Increment Tests ---
    test('increment should only affect LSB initially', () => {
        const countersInstance = new Counters(LENGTHS);
        countersInstance.increment(); // [0, 0, 0] -> [0, 0, 1]
        expect(countersInstance.getCurrentCounts()).toEqual([0, 0, 1]);
    });

    test('increment should handle chain/ripple effect', () => {
        const countersInstance = new Counters(LENGTHS);

        // Go from [0, 0, 0] to [0, 1, 0]
        countersInstance.increment(); // [0, 0, 1]
        countersInstance.increment(); // [0, 0, 2] -> LSB resets, Mid increments
        expect(countersInstance.getCurrentCounts()).toEqual([0, 1, 0]);

        // Go from [0, 4, 1] to [1, 0, 0]
        countersInstance.reset(); // [0, 0, 0]
        // Set to [0, 4, 1]
        for (let i = 0; i < 9; i++) countersInstance.increment();
        expect(countersInstance.getCurrentCounts()).toEqual([0, 4, 1]);

        countersInstance.increment(); // LSB resets, Mid becomes 5 (resets), MSB increments
        expect(countersInstance.getCurrentCounts()).toEqual([1, 0, 0]);
    });

    test('increment should set isFinished after total cycle completion', () => {
        const countersInstance = new Counters([2, 2]); // Total max count is 4

        // Cycle 1: [0, 0] -> [0, 1] -> [1, 0] -> [1, 1]
        // Max value is [1, 1]. The next increment should trigger finish.
        countersInstance.increment(); // [0, 1]
        countersInstance.increment(); // [1, 0]
        countersInstance.increment(); // [1, 1]
        expect(countersInstance.isFinished()).toBe(false);

        countersInstance.increment(); // [0, 0], and MSB (index 0) wraps, sets isFinished=true
        expect(countersInstance.getCurrentCounts()).toEqual([0, 0]);
        expect(countersInstance.isFinished()).toBe(true);
    });

    // --- Decrement Tests ---
    test('decrement should wrap LSB from 0 to length-1', () => {
        const countersInstance = new Counters(LENGTHS);
        countersInstance.decrement(); // [0, 0, 0] -> [0, 4, 1]
        // MSB (10), Mid (5), LSB (2)
        // LSB wraps to 1 (2-1), Mid wraps to 4 (5-1), MSB wraps to 9 (10-1)
        expect(countersInstance.getCurrentCounts()).toEqual([9, 4, 1]);
    });
});
