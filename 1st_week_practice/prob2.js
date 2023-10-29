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

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const scores = [
  {name: '초롱이', kor: 60, math: 63, eng: 87},
  {name: '빡빡이', kor: 40, math: 72, eng: 82},
  {name: '마동석', kor: 70, math: 38, eng: 41},
  {name: '리키', kor: 90, math: 96, eng: 56},
  {name: '백바지', kor: 85, math: 53, eng: 78}
];

// 위 데이터를 바탕으로 아래 함수들을 만들어 봅시다.

// - eng 과목 전체 평균을 내는 함수
// - 각 학생의 국,영,수 평균을 내는 함수

// 조건 1) go, pipe, reduce, curry, map, filter 등등을 적극 활용해주세요.


const add = (a,b) => a+b;

// const averageOfEnglish = s = {
//   log(typeof s == `array`)
//   return pipe(
//   map(s => s.eng),
//   reduce(add),
//   sum => sum/scores.length)};
  
const averageOfEnglish = s = pipe(
  map(s => s.eng),
  reduce(add),
  sum => sum / s.length
);

log(averageOfEnglish(scores));

// const average = (s) = pipe(
//   reduce(add),
//   sum => sum/s.length);

// const averageOfEnglish = s = pipe(
//   map(s => s.eng),
//   average(s)
// )

// log(averageOfEnglish);


// const average = (scores) =>
//   pipe(
//     reduce((a, b) => a + b),
//     (sum) => sum / scores.length
//   );


/**
	한 학생의 국영수 평균
	@return [
	   { name: '초롱이', 평균: 32 }
	   { name: '빡빡이', 평균: 32 }
	   ....
	]
*/
// const averageOfStudents = s = pipe(
//   map(s => { name : s.name, average : s.eng),
//   reduce(add),
//   sum => sum/5);

// log(averageOfStudents(scores));