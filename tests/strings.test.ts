import * as assert from "./assert";
import {stringReplaceNext} from "../strings";

var s = "a b   a   b aaa b aa bb a bababa  a";

var left = -1;
do {
  [s, left] = stringReplaceNext(s, "a", "b", left + 1);
} while (left != -1);

assert.equal(s, "b b   b   b bbb b bb bb b bbbbbb  b");
