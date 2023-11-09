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

// log(range(5));

// log(range(2))

var list = range(4);
// log(list);
// log(reduce(add, list));


// 느긋한 L.ragne

const L = {};
L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    // log(i, 'L.range');
    yield i;
  }
}

var list = L.range(4);
// log(list);
// log(reduce(add,list));

// performance test

function test(name, time, f) {
  console.time(name);
  while(time--) f();
  console.timeEnd(name);
}

test('L.range', 10, () => reduce(add, L.range(1000000)));
test('ragne', 10, () => reduce (add, range(1000000)));