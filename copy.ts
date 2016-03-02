import {assign} from "./assign";

export function shallowCopy<T>(o:T):T {
  if (o == null) return o;
  if (typeof o === "string") return o;
  if (typeof o === "number") return o;
  if (o instanceof Date) return (<any>new Date((<any>o).getTime()));
  if (o instanceof Array) {
    return (<any>o).slice(0);
  }

  var copy = Object.create(o.constructor.prototype);
  assign(copy, o);
  return copy;
}