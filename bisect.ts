import {compareNumbers, compareStrings} from "./compare";

export function bisect<T>(val:T, array:T[], comparator:(a:T, b:T) => number, favorRight?:boolean) {
  var l = 0, length = array.length, r = length;
  if (length === 0) {
    return 0;
  }

  while (l < r) {
    var m = l + r >>> 1;

    if (favorRight) {
      if (comparator(val, array[m]) < 0) {
        r = m;
      } else {
        l = m + 1;
      }
    } else {
      if (comparator(array[m], val) < 0) {
        l = m + 1;
      } else {
        r = m;
      }
    }
  }

  return l;
}

export function bisectNumLeft(val:number, array:number[]) {
  return bisect(val, array, compareNumbers);
}

export function bisectNumRight(val:number, array:number[]) {
  return bisect(val, array, compareNumbers, true);
}

export function bisectStringLeft(val:string, array:string[]) {
  return bisect(val, array, compareStrings);
}

export function bisectStringRight(val:string, array:string[]) {
  return bisect(val, array, compareStrings, true);
}
