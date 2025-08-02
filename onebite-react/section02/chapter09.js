// filter
// 조건을 만족하는 요소들만 새로운 배열로 반환
let arr1 = [
  { name: 'John', age: 20 },
  { name: 'Jane', age: 21 },
  { name: 'Jim', age: 22 },
];
let filter = arr1.filter((item) => item.age > 20);
// console.log(filter);

// map
// 배열의 모든 요소를 순회하면서, 각각 콜백함수를 실행하고 그 결과값들을 모아서 새로운 배열로 반환
let map1 = arr1.map((item) => item.age);
// console.log(map1);
let map2 = arr1.map((item) => {
  return {
    ...item,
    age: item.age * 2,
  };
});
// console.log(map2);

// sort
// 배열의 요소를 사전순으로 정렬하는 메서드 (원본 배열 변경)
let arr3 = ['a', 'b', 'c', 'd', 'e'];
arr3.sort();
// console.log(arr3);

let arr33 = [10, 3, 5];
arr33.sort((a, b) => a - b);
// console.log(arr33);

let arr333 = [10, 3, 5];
arr333.sort((a, b) => b - a);
// console.log(arr333);

// toSorted
// 새로운 배열을 반환하는 메서드 (원본 배열 변경 없음)

// join
// 배열의 모든 요소를 하나의 문자열로 합쳐서 반환하는 메서드
let arr6 = ['hi', 'hello', 'world'];
const joined = arr6.join();
console.log(joined);
const joined2 = arr6.join(' ');
console.log(joined2);
