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

const add = (a,b) => a+b;

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    // log(i, 'range');
    res.push(i);
  }
  return res;
};

const L = {};
L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    // log(i, 'L.range');
    yield i;
  }
}

// take func

const take = curry((l, iter) => {
  let = res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length ==l) return res;
  }
  return res;
});

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

console.time('');
go(
  range(100000),
  take(5),
  reduce(add),
  log);
console.timeEnd('');

console.time('');
go(
  L.range(100000),
  take(5),
  reduce(add),
  log);
console.timeEnd('');