import * as assert from "./assert";
import {compareStrings} from "../compare";

console.log("compare test");

assert.equal(compareStrings("a", "a"), 0);
assert.equal(compareStrings("b", "a"), 1);
assert.equal(compareStrings("b", "c"), -1);
