
  // javascript가 ES6가 되면서 리스트 순회가 많이 바꼈다.

  // 기존 ES5의 방식
  const list = [1,2,3];
  for (var i = 0; i < list.length; i++) {
    console.log(list[i]);
  }

  // 문자열 순회
  const str = 'abc';
  for (var i = 0; i < str.length; i++) {
    console.log(str[i]);
  }

  // ES6에서 리스트 순회
  for (const a of list) {
    console.log(a);
  }
  for (const a of str) {
    console.log(a);
  }


  // array, set, map을 for of 문으로 순회
  
  // array 순회 
  const arr = [1,2,3];
  for (const a of arr) console.log(a); // print 1, print 2, print 3

  // set 순회
  const set = new Set([1,2,3]);
  for (const a of set) console.log(a); // print 1, print 2, print 3

  // map 순회
  const map = new Map([['a', 1],['b',2],['c',3]]);
  for (const a of map) console.log(a); // print (2) ["a", 1], print (2) ["b", 2], print (2) ["c", 3]




  // ES6에서 Symbol.iterator가 추가되어 객체의 키로 사용된다.
  console.log(arr[Symbol.iterator]); // print f values() { [native code] }

  // array, set, map 모두 Symbol.iterator를 통해서 iterable/iterator 프로토콜을 따른다.
  // 이터러블: 이러레이터를 리턴하는 [Symbol.iterator]()를 가진 값
  // 이터레이터: {value, done} 객체를 리턴하는 next()를 가진 값
  // 이터러블/이터레이터 프로토콜: 이터러블을 for of, 전개 연산자 등과 함께 동작하도록 한 규약

  // array는 iterable이다.
  let iterator = arr[Symbol.iterator]();

  iterator.next() // print {value: 1, done: false}  
  iterator.next() // print {value: 2, done: false}  
  iterator.next() // print {value: 3, done: false}  
  iterator.next() // print {value: undefined, done: true}  

  // map은 다양한 활용법이 있다.
  console.log("--map--")
  
  map // print Map(3) {"a" => 1, "b" => 2, "c" => 3}
  map.keys(); // print MapIterator {"a", "b", "c"}
  var a = map.keys();
  console.log(a);
  console.log(a.next()) // print {value: "a", done: false};
  // console.log(a.next()) // print {value: "b", done: false};
  // console.log(a.next()) // print {value: "c", done: false};


  for (const b of a) console.log(b);
  // MapIterator는 keys(), values(), entries() 메서드를 통해서 키, 벨류, array에 접근할 수 있다.
  // map.keys()도 Symbol.iterator 키를 가지고 있다.
