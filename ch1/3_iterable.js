// iterator practice

// 사용자 정의를 통해서 iterable의 구조를 이해해보자.

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? {done: true} : { value: i--, done: false}
      },
      // well-formed 이터레이터가 되기 위해서는 iter2[Symbol.iterator]() == iter2를 만족해야한다.
      [Symbol.iterator]() {return this;} 
    }
  }
};

let iterator = iterable[Symbol.iterator]();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// for (const a of iterator) console.log(a);

// 이터레이터가 아주 잘 동작하지만 아직 덜 구현된 부분이 있다.

// const arr2 = [1,2,3];

// for (const a of arr2) console.log(a);

console.log(document.querySelectorAll('*'))

// for (const a of document.querySelectorAll('*')) console.log(a);
