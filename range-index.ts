import {bisect} from "./bisect";

export interface Range {
  left: number
  right: number
}

function leftCmp(a:RangeIndexEntry<any>, b:RangeIndexEntry<any>) {
  return a.range.left - b.range.left;
}

function leftInRightCmp(a:RangeIndexEntry<any>, b:RangeIndexEntry<any>) {
  return a.range.left - b.range.right;
}

function rightCmp(a:RangeIndexEntry<any>, b:RangeIndexEntry<any>) {
  return a.range.right - b.range.right;
}

function rightInLeftCmp(a:RangeIndexEntry<any>, b:RangeIndexEntry<any>) {
  return a.range.right - b.range.left;
}

export interface RangeIndexEntry<T extends Range> {
  id:string
  range:T
}

var uidCounter = 0;

function reverse(range:Range):Range {
  return {left: range.right, right: range.left};
}

export class RangeIndex<T extends Range> {
  private leftSortedEntries:RangeIndexEntry<T>[] = [];
  private rightSortedEntries:RangeIndexEntry<T>[] = [];

  public add(range:T):RangeIndexEntry<T> {
    var id = ++uidCounter + "";
    var entry:RangeIndexEntry<T> = {id, range}

    var leftIdx = bisect<RangeIndexEntry<T>>(entry, this.leftSortedEntries, leftCmp, true);
    var rightIdx = bisect<RangeIndexEntry<T>>(entry, this.rightSortedEntries, rightCmp, true);

    this.leftSortedEntries.splice(leftIdx, 0, entry);
    this.rightSortedEntries.splice(rightIdx, 0, entry);

    return entry;
  }

  public doesOverlap(entry:RangeIndexEntry<T>):boolean {
    var overlaps = this.overlappingWith(entry);
    if (overlaps.length == 0) return false;

    return !(overlaps.length == 1 && overlaps[0] == entry);
  }

  public overlappingWith(entry:RangeIndexEntry<T>):RangeIndexEntry<T>[] {
    var overlapping:{[k:string]: RangeIndexEntry<T>} = {};
    var reverseValue = {range: reverse(entry.range)} as RangeIndexEntry<any>;

    var leftIdx = bisect<RangeIndexEntry<T>>(entry, this.leftSortedEntries, leftCmp, false);
    var rightInLeftIdx = bisect<RangeIndexEntry<any>>(reverseValue, this.leftSortedEntries, leftCmp, false);

    // Expected: no lefts are greater than my left, but less than my right.
    for (var i = leftIdx; i < rightInLeftIdx; ++i) {
      var next = this.leftSortedEntries[i];
      overlapping[next.id] = next;
    }

    var rightIdx = bisect<RangeIndexEntry<T>>(entry, this.rightSortedEntries, rightCmp, false);
    var leftInRightIdx = bisect<RangeIndexEntry<T>>(reverseValue, this.rightSortedEntries, rightCmp, false);

    // Expected: no rights are greater than my left, but less than my right.
    for (var i = leftInRightIdx; i < rightIdx; ++i) {
      if (entry.range.left === this.rightSortedEntries[i].range.right) continue;
      var next = this.rightSortedEntries[i];
      overlapping[next.id] = next;
    }

    // Expected: no lefts are less than my left, and the same right be greater than or equal to my right.
    for (var i = leftIdx - 1; i >= 0; --i) {
      if (this.leftSortedEntries[i].range.right < entry.range.right) continue

      var next = this.leftSortedEntries[i];
      overlapping[next.id] = next;
    }

    return Object.keys(overlapping).map((k) => {
      return overlapping[k]
    });
  }

  public getEntries():RangeIndexEntry<T>[] {
    return this.leftSortedEntries.slice();
  }

  public clear() {
    var length = this.leftSortedEntries.length;
    for (var i = 0; i < length; ++i) {
      this.leftSortedEntries.pop();
      this.rightSortedEntries.pop();
    }
  }
}