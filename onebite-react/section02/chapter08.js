// forEach
// 모든 요소를 순회하면서, 각각의 요소에 특정 동작을 수행하는 메서드
let arr1 = [1, 2, 3, 4, 5];
arr1.forEach((item, idx, arr) => {
  // console.log(item, idx, arr);
});

let doubledArr = [];
arr1.forEach((item) => {
  doubledArr.push(item * 2);
});
// console.log(doubledArr);

// includes
// 배열에 특정 요소가 있는지 확인하는 메서드
let arr2 = [1, 2, 3, 4, 5];
let isExist = arr2.includes(3);
// console.log(isExist);

// indexOf 얕은 비교를 통해 인덱스를 반환하는 메서드
let arr3 = [1, 2, 3, 4, 5];
let index = arr3.indexOf(3);
// console.log(index);

let objectArr = [
  { name: 'John', age: 20 },
  { name: 'Jane', age: 21 },
  { name: 'Jim', age: 22 },
];
const fi = objectArr.findIndex((item) => {
  return item.age > 20;
});
// console.log(fi);

// findIndex
// 모든 요소를 순회하면서, 콜백함수를 만족하는
// 특정 요소의 인덱스(위치)를 반환하는 메서드
let arr4 = [1, 2, 3, 4, 5];
const findIndex = arr4.findIndex((item) => {
  // return item > 3;
  if (item % 2 === 0) return true;
});
// console.log(findIndex);

// find 요소 자체를 반환함
let arr5 = [1, 2, 3, 4, 5];
const find = arr5.find((item) => {
  return item > 3;
});
// console.log(find);
const find2 = objectArr.find((item) => item.age > 20);
console.log(find2);
