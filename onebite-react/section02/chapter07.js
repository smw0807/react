// 6가지의 요소 조작 메서드

let arr1 = [1, 2, 3];
const newLength = arr1.push(4, 5, 6);
// console.log(arr1);
// console.log(newLength);

let arr2 = [1, 2, 3];
const pop = arr2.pop(); // 맨 뒤의 요소 제거 및 반환
// console.log(arr2); // [1, 2]
// console.log(pop); //3

// shift와 unshift는 배열의 인덱스를 새로 정의해야하기 때문에 push와 pop에 비해 성능이 떨어짐
let arr3 = [1, 2, 3];
const shift = arr3.shift(); // 맨 앞의 요소 제거 및 반환
// console.log(arr3); // [2, 3]
// console.log(shift); // 1

let arr4 = [1, 2, 3];
const unshift = arr4.unshift(4, 5, 6); // 맨 앞에 요소 추가 및 변경된 길이 반환
// console.log(arr4); // [4, 5, 6, 1, 2, 3]
// console.log(unshift); // 6

let arr5 = [1, 2, 3, 4, 5];
const sliceItem = arr5.slice(2, 5); // 2번째 인덱스부터 5번째 인덱스 전까지 자르고 반환
const sliceItem2 = arr5.slice(2); // 2번째 인덱스부터 끝까지 자르고 반환
const sliceItem3 = arr5.slice(); // 배열 전체를 자르고 반환
const sliceItem4 = arr5.slice(-2); // 끝에서 두번째 인덱스부터 끝까지 자르고 반환
// console.log(sliceItem); // [3, 4, 5]
// console.log(sliceItem2); // [3, 4, 5]
// console.log(sliceItem3); // [1, 2, 3, 4, 5]
// console.log(sliceItem4); // [4, 5]

let arr6 = [1, 2];
let arr7 = [3, 4];
const concatItem = arr6.concat(arr7);
console.log(concatItem);
