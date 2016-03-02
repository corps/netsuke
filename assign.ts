export function assign<T>(target:Object, ...sources:T[]):T {
  var from:T;
  target = Object(target);

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (from.hasOwnProperty(key)) {
        (<any>target)[key] = (<any>from)[key];
      }
    }
  }

  return <any>target;
}