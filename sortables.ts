var MAX_INTEGER = 9007199254740991;

export function sortableStringOfInteger(n:number):string {
  if (n === 0) return "0-0";
  if (n < 0) {
    return "-" + sortableStringOfInteger(MAX_INTEGER + n);
  }
  n = Math.min(Math.floor(n), MAX_INTEGER);
  return Math.floor(log10(n)).toString(36) + "-" + n;
}

function log10(n:number) {
  for (var i = 0; n >= 10; ++i) {
    n = n / 10;
  }
  return i;
}