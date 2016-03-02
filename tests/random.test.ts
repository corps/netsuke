import * as assert from "./assert";
import {SimpleSeededRandom, shuffle} from "../random";

var random = new SimpleSeededRandom(1500);

var numbers = {} as {[k:number]:boolean};
var runs = 10000;
var total = 0;

for (var i = 0; i < runs; ++i) {
  var next = random.next();
  assert.ok(!numbers[next]);
  numbers[next] = true;
  total += next;
}

var median = total / runs;
assert.ok(median > 0.4);
assert.ok(median < 0.6);

assert.deepEqual(shuffle([1, 2, 3, 4, 5, 6], () => random.next()), [1, 6, 4, 3, 2, 5]);
