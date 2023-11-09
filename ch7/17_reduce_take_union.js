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

const queryStr = obj => go(
  obj,
  Object.entries,
  map(([k,v]) => `${k}=${v}`),
  reduce((a,b)=> `${a}&${b}`)
);
// log(queryStr({ limit: 10, offset: 10, type: 'notice'}));


// join func

const join = curry((sep = ',', iter) => 
  reduce((a,b) => `${a}${sep}${b}`, iter));



const queryStr2 = pipe(
  Object.entries,
  map(([k,v]) => `${k}=${v}`),
  join('&')
);
log(queryStr2({ limit: 20, offset: 20, type: 'notice'}));

// 이렇게 만들어진 조인은 사전 정의된 join과 다르게 다양한 이터러블 및 제너레이터에 사용가능하다.

function *a() {
  yield 10;
  yield 11;
  yield 12;
  yield 13;
}

// log(join(' - ', a()));

// 지연성을 더해준 queryStr3 만들기

L.entries = function *(obj) {
  for (const k in obj) yield [k, obj[k]];
};

const queryStr3 = pipe(
  L.entries,
  L.map(([k,v]) => `${k}=${v}`),
  join('&'));

// log(queryStr3({ limit: 20, offset: 20, type: 'notice'}));

// take, find

const users = [
  { age: 32},
  { age: 31},
  { age: 37},
  { age: 28},
  { age: 25},
  { age: 32},
  { age: 31},
  { age: 37}
];

const find2 = (f, iter) => go(
  iter,
  filter(a => (log(a), f(a))),
  a => (log(a), a),
  take(1),
  ([a]) => a
);


log(find2(u => u.age < 30, users))

log('L.filter')

const find = curry((f, iter) => go(
  iter,
  L.filter(a => (log(a), f(a))),
  a => (log(a), a),
  take(1),
  ([a]) => a
));

log(find(u => u.age < 30, users))