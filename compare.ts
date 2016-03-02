export function compareNumbers(a:number, b:number) {
  return a - b;
}

export function compareStrings(a:string, b:string) {
  return a < b ? -1 : a == b ? 0 : 1;
}
