var randF = () => Math.random()

export function shuffle(array:any[], randomF = randF) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(randomF() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

var max = Math.pow(2, 32);
export class SimpleSeededRandom {
  constructor(public seed = Math.round(Math.random() * max)) {
  }

  next() {
    this.seed += (this.seed * this.seed) | 5;
    return (this.seed >>> 32) / max;
  }
}