const log = console.log;

// 제너레이터는 이터러블을 생성하는 함수이자 이터레이터이다.

// 제너레이터는 일반 함수 앞에 *, 에스터리스크를 달아준다.

function *gen() {
  yield 1;
  yield 2;
  yield 3;
}

let iter1 = gen();
log(iter1[Symbol.iterator])
log(iter1[Symbol.iterator]() == iter1)
log(iter1.next());
log(iter1.next());
log(iter1.next());
log(iter1.next());
