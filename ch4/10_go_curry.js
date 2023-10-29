const log = console.log

// curry
const curry = f => (a,..._) => _.length ? f(a,..._) : (..._) => f(a,..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc,a);
  }
  return acc;
});

const products = [
  {name: '반팔티', price: 15000 },
  {name: '긴팔티', price: 20000 },
  {name: '핸드폰케이스', price: 15000 },
  {name: '후드티', price: 30000 },
  {name: '바지', price: 25000 },
];

// curry로 go함수 개선해보기

const go = (...args) => reduce((a, f) => f(a), args);


const add = (a,b) => a+b;

go(
  products,
  filter(p => p.price <= 20000),
  map(p => p.price),
  reduce(add),
  log
);




const mult = curry((a,b) => a * b);
log(mult(3)(2));

const mult3 = mult(3);

log(mult3(10));
log(mult3(5));
log(mult3(3));


// 함수 조합으로 함수 만들기

log("----------")

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const total_price = pipe(
  map(p => p.price),
  reduce(add));

const best_total_price = predi => pipe(
  filter(predi),
  total_price
)

go(
  products,
  best_total_price(p => p.price <= 20000),
  log
);

go(
  products,
  best_total_price(p => p.price > 20000),
  log
);

