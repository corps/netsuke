import * as assert from "./assert";
import {sortableStringOfInteger} from "../sortables";

console.log("sortables test");

var numbers = [] as number[];
for (var i = 0; i < 10000; ++i) {
  numbers.push(Math.floor(Math.random() * 10000 - 5000));
}

var sortableAsStrings = numbers.map(sortableStringOfInteger);

assert.ok(sortableStringOfInteger(0) < sortableStringOfInteger(1));
assert.ok(sortableStringOfInteger(0) > sortableStringOfInteger(-1));
assert.ok(sortableStringOfInteger(-1) > sortableStringOfInteger(-2));
assert.ok(sortableStringOfInteger(1000) > sortableStringOfInteger(101));

assert.deepEqual(sortableAsStrings.sort(),
  numbers.sort((a, b) => a - b).map(sortableStringOfInteger));
