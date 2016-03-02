import * as assert from "./assert";
import {RangeIndex, RangeIndexEntry} from "../range-index";

console.log("range tests");

function leftCmp(a:RangeIndexEntry<any>, b:RangeIndexEntry<any>) {
  return a.range.left - b.range.left;
}

var a = {left: 1, right: 7};
var b = {left: 3, right: 9};
var c = {left: 3, right: 9};
var d = {left: 4, right: 5};
var e = {left: 7, right: 12};
var f = {left: 99, right: 100};

// empty miss
(() => {
  var rangeIndex = new RangeIndex();
  assert.deepEqual(rangeIndex.overlappingWith({range: a, id: "a"}), []);
  assert.ok(!rangeIndex.doesOverlap({range: a, id: "a"}));
})();

// isolated entry at far left and right bounds
(() => {
  var rangeIndex = new RangeIndex();
  var entryB = rangeIndex.add(b);
  var entryC = rangeIndex.add(c);
  var entryD = rangeIndex.add(d);
  var entryE = rangeIndex.add(e);

  assert.deepEqual(rangeIndex.overlappingWith({range: f, id: "f"}).sort(leftCmp), []);
  assert.ok(!rangeIndex.doesOverlap({range: f, id: "f"}));

  var entryF = rangeIndex.add(f);
  assert.deepEqual(rangeIndex.overlappingWith(entryF).sort(leftCmp), [entryF]);
  assert.ok(!rangeIndex.doesOverlap(entryF));
})();

// right overlapping left, left overlapping rightovar rangeIndex = new range.RangeIndex();
(() => {
  var rangeIndex = new RangeIndex();
  var entryB = rangeIndex.add(b);
  var entryC = rangeIndex.add(c);
  var entryD = rangeIndex.add(d);
  var entryE = rangeIndex.add(e);

  assert.deepEqual(rangeIndex.overlappingWith({range: a, id: "a"}).sort(leftCmp), [entryB, entryC, entryD]);
  assert.ok(rangeIndex.doesOverlap({range: a, id: "a"}));

  var entryA = rangeIndex.add(a);
  assert.deepEqual(rangeIndex.overlappingWith(entryA).sort(leftCmp), [entryA, entryB, entryC, entryD]);
  assert.ok(rangeIndex.doesOverlap(entryA));
})();

// fully contained overlaps
(() => {
  var rangeIndex = new RangeIndex();
  rangeIndex.add(a);
  assert.ok(rangeIndex.doesOverlap({range: d, id: "d"}));

  rangeIndex = new RangeIndex();
  rangeIndex.add(d);
  assert.ok(rangeIndex.doesOverlap({range: a, id: "a"}));
})();

// detect overlap between a range on the far right of several inside one large one
(() => {
  var rangeIndex = new RangeIndex();
  var wideRange = {left: 1, right: 20};
  var firstShort = {left: 2, right: 5};
  var secondShort = {left: 5, right: 9};
  var thirdShort = {left: 7, right: 11};
  var secondEntry = rangeIndex.add(secondShort);
  var firstEntry = rangeIndex.add(firstShort);
  var wideEntry = rangeIndex.add(wideRange);
  var thirdEntry = rangeIndex.add(thirdShort);
  assert.deepEqual(rangeIndex.overlappingWith(thirdEntry).sort(leftCmp), [wideEntry, secondEntry, thirdEntry]);
})();

// neighbors
(() => {
  var rangeIndex = new RangeIndex();
  rangeIndex.add({left: 0, right: 10});
  assert.ok(!rangeIndex.doesOverlap({range: {left: 10, right: 15}, id: "a"}));
})();

// fully contained overlaps right rim
(() => {
  var rangeIndex = new RangeIndex();
  rangeIndex.add({left: 0, right: 10});
  assert.ok(rangeIndex.doesOverlap({id: "a", range: {left: 5, right: 10}}));

  rangeIndex = new RangeIndex();
  rangeIndex.add({left: 5, right: 10});
  assert.ok(rangeIndex.doesOverlap({id: "a", range: {left: 0, right: 10}}));
})();

// fully contained overlaps left rim
(() => {
  var rangeIndex = new RangeIndex();
  rangeIndex.add({left: 0, right: 10});
  assert.ok(rangeIndex.doesOverlap({id: "a", range: {left: 0, right: 5}}));

  rangeIndex = new RangeIndex();
  rangeIndex.add({left: 0, right: 5});
  assert.ok(rangeIndex.doesOverlap({id: "a", range: {left: 0, right: 10}}));
})();

// Entry doesn't overlap with index of just itself
(() => {
  var rangeIndex = new RangeIndex();
  var testingRange = {left: 0, right: 10};
  var entryOne = rangeIndex.add(testingRange);
  var entryTwo = rangeIndex.add({left: 11, right: 17});
  assert.equal(rangeIndex.overlappingWith(entryOne).length, 1)
  assert.ok(!rangeIndex.doesOverlap(entryOne));
})();

// identical ranges
(() => {
  var rangeIndex = new RangeIndex();
  var entryB = rangeIndex.add(b);
  var entryC = rangeIndex.add(c);
  var entryD = rangeIndex.add(d);
  var entryE = rangeIndex.add(e);

  assert.deepEqual(rangeIndex.overlappingWith(entryB).sort(leftCmp), [entryB, entryC, entryD, entryE]);
  assert.ok(rangeIndex.doesOverlap(entryB));
  assert.deepEqual(rangeIndex.overlappingWith(entryC).sort(leftCmp), [entryB, entryC, entryD, entryE]);
  assert.ok(rangeIndex.doesOverlap(entryC));
})();
