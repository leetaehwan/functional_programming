// import * as m from "./map_filter_reduce";
// const m = require('./map_filter_reduce');

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


log(map(p => p.price, products));

// 중첩된 함수를 사용해보자.
// filter 함수를 인자로 받는 2만원 이상의 제품만 추려서, map으로 가격만의 배열로 만들자.

log(map(p => p.price, filter(p => p.price >= 20000, products)));

// 위에 골라진 아이템들의 가격들을 reduce를 통해 합친다.

const add = (a,b) => a + b

log(
  reduce(add,
    map(p => p.price, filter(p => p.price >= 20000, products))
  )
);

// map과 filter의 순서를 바꿔도 무방하다.

log(
  reduce(add,
    filter(n => n < 20000,
      map(p => p.price, products)
    )
  )
)