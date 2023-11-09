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

// L.map 과 L.filter 의 중첩사용

L.map = curry(function *(f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function *(f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
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

const takeAll = take(Infinity)
const map = curry(pipe(L.map, takeAll));
const filter = curry(pipe(L.filter, takeAll));

/* map, filter 계열 함수들이 가지는 결합 법칙이 있다.

- 사용하는 데이터가 무엇이든지 (리스트, 제너레이터, 이터레이터 등)
- 사용하는 보조함수가 순수 함수라면
- 아래와 같이 결합한 두 가지 방식 모두의 결과는 같다.

[[mapping, mapping], [filtering, filtering], [mapping, mapping]]
=
[[mapping, filtering, mapping], [mapping, filtering, mapping]]
*/

/* 결과를 만드는 함수 reduce, take

- reduce는 이터러블이나 배열의 값을 꺼내서 더하거나 하는 식으로 유지시키지 않고 깨뜨리기 때문에 결과를 만든다.
- 연산의 시작을 알리는 역할을 한다.

- take도 몇 개로 떨어질 지 모르는 형태로 축약시키거나 하는 등의 기능이기 때문에 지연성을 자체에서 갖기보다는 결과를 만드는 것이 좋다.

*/

const queryStr = pipe(
  Object.entries,
  map(([k,v]) => `${k}=${v}`),
  reduce((a,b)=> `${a}&${b}`)
);

// join func

const join = curry((sep = ',', iter) => {
  reduce((a,b) => `${a}${sep}${b}`, iter);
});




// L.flatten

log([[1,2], 3, 4, [5,6], [7,8,9]]);
log([...[1,2], 3, 4, ...[5,6], ...[7,8,9]]);

const isIterable = a => a && a[Symbol.iterator];

L.flatten = function *(iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};


var it = L.flatten([[1,2], 3, 4, [5,6], [7,8,9]]);
log(it.next())
log(it.next())
log(it.next())
log(it.next())
log(it.next())
log(it.next())
log(it.next())
log(it.next())


const flatten = pipe(L.flatten, takeAll);
log(flatten([[1,2], 3, 4, [5,6], [7,8,9]]));