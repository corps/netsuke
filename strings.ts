export function stringReplaceNext(original:string, keyword:string, replacement:string, left:number):[string, number] {
  left = original.indexOf(keyword, left);
  if (left == -1) return [original, -1];
  return [original.substring(0, left) + replacement + original.substr(left + keyword.length, original.length), left];
}

export function escapeRegex(s:string):string {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};