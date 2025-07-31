/**
 * 원시타입과 객체타입
 * 원시타입: 값 자체로써 변수에 저장되고 복사된다. (불변값)
 * 객체타입: 참조값을 통해 변수에 저장되고 복사된다. (가변값)
 * 원시타입과 객체타입은 값이 저장되거나 복사되는 과정이 서로 다름기 때문
 */

let p1 = 1;
let p2 = p1;
console.log(p1, p2); // 1, 1
p1 = 2;
console.log(p1, p2); // 2, 1

let o1 = { name: 'John', age: 20 };
let o2 = o1;
console.log(o1, o2); // {name: 'John', age: 20}, {name: 'John', age: 20}
o2.age = 21;
console.log(o1, o2); // {name: 'John', age: 21}, {name: 'John', age: 21}

// let o3 = Object.assign({}, o1);
let o3 = { ...o1 };
o3.age = 22;
console.log(o1, o3); // {name: 'John', age: 21}, {name: 'John', age: 22}

function funcA(a) {
  // console.log('funcA 1', a);
  const b = { ...a };
  console.log('funcA 1', b);
  // a.age = 23; // 원본 객체 변경됨
  b.age = 23;
  console.log('funcA 2', o3);
}
console.log('o3', o3);
funcA(o3);
console.log('o33', o3);
