const log = console.log

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
}

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc,a);
  }
  return acc;
}

const products = [
  {name: '반팔티', price: 15000 },
  {name: '긴팔티', price: 20000 },
  {name: '핸드폰케이스', price: 15000 },
  {name: '후드티', price: 30000 },
  {name: '바지', price: 25000 },
];

// go함수 사용해보기

const go = (...args) => reduce((a, f) => f(a), args);


// go(0,
//   a => a + 1,
//   a => a + 10,
//   a => a + 100,
//   log);

// go 함수는 인자로 함수를 받는다. 따라서 reduce를 활용하여 배열의 요소로 입력받은 go함수를 순회하며 연산해준다.

// 함수들이 나열된 합성된 함수를 나타내는 pipe함수를 만들자.

// log(f(0));

log('---map---')

const add = (a,b) => a+b;

// go(
//   add(0,1),
//   a => a + 10,
//   a => a + 100,
//   log);

log('---pipe---')

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const f = pipe(
  (a,b) => a + b,
  a => a + 10,
  a => a + 100);

log(f(0, 1));


// go 함수를 통해서 이전 기능을 구현해보자.

go(
  products,
  products => filter(p => p.price <= 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
);