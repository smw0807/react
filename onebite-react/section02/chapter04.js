// 스프레드 연산자
// Spread Operator 흩뿌리다, 펼치다
// 객체나 배열에 저장된 여러개의 값을 개별로 흩뿌려주는 역할
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]);

let obj1 = { name: 'John', age: 20 };
let obj2 = { city: 'Seoul', country: 'Korea' };
console.log({ ...obj1, ...obj2 });

function funcA(a, b, c) {
  console.log(a, b, c);
}
funcA(...arr1);

// Rest Parameter
// 나머지
function funcB(a, b, c, ...rest) {
  console.log(a, b, c, rest);
}
funcB(...arr1, ...arr2);
