import * as assert from "./assert";
import {bisect} from "../bisect";

function cmp(a:number, b:number) {
  return a - b;
}

console.log("Bisect tests");

assert.equal(bisect(6, [1, 4, 9, 12, 27], cmp), 2);
assert.equal(bisect(-1, [1, 4, 9, 12, 27], cmp), 0);
assert.equal(bisect(100, [1, 4, 9, 12, 27], cmp), 5);

var a = {a: 1};
var b = {a: 2};
var c = {a: 0};
assert.equal(bisect(a, [c, a, a, a, b, b], (a, b) => {
  return a.a - b.a;
}), 1);

assert.equal(bisect(6, [1, 4, 9, 12, 27], cmp, true), 2);
assert.equal(bisect(-1, [1, 4, 9, 12, 27], cmp, true), 0);
assert.equal(bisect(100, [1, 4, 9, 12, 27], cmp, true), 5);

var a = {a: 1};
var b = {a: 2};
var c = {a: 0};
assert.equal(bisect(a, [c, a, a, a, b, b], (a, b) => {
  return a.a - b.a;
}, true), 4);