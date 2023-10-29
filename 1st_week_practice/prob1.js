

// const numbers = [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10];
// let result = [];

// for(let i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 2 === 0) {
//         result.push(numbers[i] * 4);
//     }
// }
// result = result.slice(0, 2);

// console.log(result);

const log = console.log

function *infinity(i = 0) {
  while (true) yield i++;
}

function *limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}

function *mult4(l,t) {
  let n = 1
  for (const a of limit(l, infinity(1))) {
    if (a % 2 === 0) {
      if (n > t) return
      yield a * 4;
      n += 1
    }
  }
}

log(...mult4(10,2))