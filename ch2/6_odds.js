const log = console.log

// 홀수를 자동으로 순회하는 odds를 다뤄보자.

// function *odds(l) {
//   for (let i = 0; i < l; i++){
//     if (i % 2) yield i;
//   }
// }

// let iter2 = odds(10);
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())
// log(iter2.next())


// 무한 수열을 표현하는 infinity 제너레이터를 만들어보자.

function *infinity(i = 0) {
  while (true) yield i++;
}

// iter3 = infinity();
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())
// log(iter3.next())


// infinity 함수를 활용하여 odds 함수를 다시 선언해보자.

// function *odds(l) {
//   for (const a of infinity(1)){
//     if (a % 2) yield a;
//     if (l == a) return;
//   }
// }

// iter4 = odds();
// log(iter4.next());
// log(iter4.next());
// log(iter4.next());
// log(iter4.next());
// log(iter4.next());
// log(iter4.next());


// limit을 만들어내는 이터레이터도 만들어보자.

function *limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}

// limit 함수를 통해서 iterator의 l값 이하까지만 이터레이터로 줄여준다. l 이하의 홀수만 순회할 수 있는 이터레이터를 만드는 함수로 바꿔보자.

function *odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

let iter5 = odds(10);
log(iter5.next())
log(iter5.next())
log(iter5.next())
log(iter5.next())
log(iter5.next())
log(iter5.next())

for (const a of odds(40)) log(a);


// 전개연산자와 함께 사용해보기

log(...odds(10));
log([...odds(10),...odds(20)]);

// 구조 분해를 사용해보기

const [head, ...tail] = odds(5);
log(head);
log(tail);