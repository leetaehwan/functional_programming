const log = console.log

const products = [
  {name: '반팔티', price: 15000 },
  {name: '긴팔티', price: 20000 },
  {name: '핸드폰케이스', price: 15000 },
  {name: '후드티', price: 30000 },
  {name: '바지', price: 25000 },
];

// 반복문과 리스트로 이름과 가격 배열 만들어 꺼내기

// let names = [];
// for (const p of products) {
//   names.push(p.name);
// }
// log(names);


// let prices = [];
// for (const p of products) {
//   prices.push(p.price);
// }
// log(prices);

// map을 통해서 구현하기

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
}

// log(map(p => p.name, products))
// log(map(p => p.price, products))


// 이터러블 프로토콜을 따르는 map의 다형성

function *gen() {
  yield 2;
  yield 3;
  yield 4;
}
iter4 = gen();
// log(map(a => a * a, iter4));


let m = new Map();
m.set('a', 10);
m.set('b', 20);

// log(new Map(map(([k,a]) => [k, a*2], m)));

// 특정 조건을 만족하는 아이템만 조회하기
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}

// log(...under20000);

// filter를 통해서 구현하자

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
}

log(...filter(p => p.price >= 20000, products));

log(...filter(n => n %2, function *() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
  }()));



// reduce 실습
// reduce는 배열의 모든 값들을 연산하여 값을 출력한다.

// 반복문으로 먼저 구현해보자.
const nums = [1,2,3,4,5];

let total = 0;
for (const a of nums) {
  total = total + a;
}

// log(total);

//위와 같이 동작하는 reduce 함수를 정의해보자.

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

const add = (a,b) => a+b;

log(reduce(add, 0, [1,2,3,4,5]));

log(reduce(add, [1,2,3,4,5]));


// reduce를 이용하여 모든 제품의 가격을 더해보기

log(
  reduce(
    (total_price, product) => total_price + product.price,
    0,
    products
  )
);