//사용할 함수

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

// curry로 go함수 개선해보기

const go = (...args) => reduce((a, f) => f(a), args);


const add = (a,b) => a+b;

const mult = curry((a,b) => a * b);


log("----------")

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

//사용할 데이터

const datas = [
  { name: 'joy', age: 20, history: [
      { day: '2021-01-01', checkin: true },
      { day: '2021-01-02', checkin: true },
      { day: '2021-01-03', checkin: true },
      { day: '2021-01-04', checkin: false },
      { day: '2021-01-05', checkin: false },
      { day: '2021-01-06', checkin: true },
      { day: '2021-01-07', checkin: true },
  ]},
  { name: 'aron', age: 30, history: [
      { day: '2021-01-01', checkin: true },
      { day: '2021-01-02', checkin: false },
      { day: '2021-01-03', checkin: true },
      { day: '2021-01-04', checkin: true },
      { day: '2021-01-05', checkin: false },
      { day: '2021-01-06', checkin: false },
      { day: '2021-01-07', checkin: true },
  ]},
  { name: 'paul', age: 24, history: [
      { day: '2021-01-01', checkin: true },
      { day: '2021-01-02', checkin: false },
      { day: '2021-01-03', checkin: true },
      { day: '2021-01-04', checkin: false },
      { day: '2021-01-05', checkin: true },
      { day: '2021-01-06', checkin: true },
      { day: '2021-01-07', checkin: false },
  ]},
]
// const joyHistory = objects.find(person => person.name === 'joy')
// log(joyHistory);
//---------------------------------------------
// 사용법 예시
const datas => go(
datas,
map(datas => (datas.name), datas),
log
)

// 출력값
// { joy: 2, aron: 3, paul: 3 }