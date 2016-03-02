import {referenceDiffs} from "../diff";
export function equal(a:any, b:any) {
  if (a !== b) {
    throw new Error("Expected " + a + " to equal " + b);
  }
}

export function ok(isOk:boolean) {
  if (!isOk) {
    throw new Error("Expectation failed");
  }
}

export function deepEqual(a:any, b:any) {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    throw new Error("Expected objects equal, found diff: " + JSON.stringify(referenceDiffs(a, b)))
  }
}