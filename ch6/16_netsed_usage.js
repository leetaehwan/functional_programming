const log = console.log

// curry
const curry = f => (a,..._) => _.length ? f(a,..._) : (..._) => f(a,..._);

const add = (a,b) => a+b;

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const map = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(f(a));
  };
  // for (const a of iter) {
  //   res.push(f(a));
  // }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      res.push(a)
    }
  }
  return res;
});


const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc,a);
  }
  return acc;
});

const L = {};
L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    // log(i, 'L.range');
    yield i;
  }
}

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);


// range, map, filter, take, reduce 중첩 사용

// go(range(10),
//   map(n => n+10),
//   filter(n => n%2),
//   take(2),
//   log);


// L.map 과 L.filter 의 중첩사용

L.map = curry(function *(f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield f(a);
  };
});

L.filter = curry(function *(f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) {
      yield a;
    }
  }
});

// take func

const take = curry((l, iter) => {
  let = res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length ==l) return res;
  }
  return res;
});

go(L.range(10),
  L.map(n => n+10),
  L.filter(n => n%2),
  take(2),
  log);


/* map, filter 계열 함수들이 가지는 결합 법칙이 있다.

- 사용하는 데이터가 무엇이든지 (리스트, 제너레이터, 이터레이터 등)
- 사용하는 보조함수가 순수 함수라면
- 아래와 같이 결합한 두 가지 방식 모두의 결과는 같다.

[[mapping, mapping], [filtering, filtering], [mapping, mapping]]
=
[[mapping, filtering, mapping], [mapping, filtering, mapping]]
*/

/* 결과를 만드는 함수 reduce, take



*/