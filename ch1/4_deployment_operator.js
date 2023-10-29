// 전개 연산자도 iterable-iterator 프로토콜을 따른다.

console.clear();
const a = [1,2];
console.log(a);
console.log(...a);
console.log(...a,[3,4]);
console.log(...a,...[3,4]);
console.log([...a,...[3,4]]);

// 프로토콜을 따르기 때문에 a[Symbol.iterator]() = null;로 설정하면, 전개연산자를 사용할 때 에러가 발생한다.

