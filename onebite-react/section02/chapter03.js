// 구조분해할당
let arr = [1, 2, 3, 4, 5];
let [a, b, c, ...rest] = arr;
console.log(a, b, c, rest); //1 2 3 [4, 5]

// 객체 구조분해할당
let obj = { name: 'John', age: 20, city: 'Seoul', country: 'Korea' };
let { name, age, ...rest2 } = obj;
console.log(name, age, rest2); //John 20 {city: 'Seoul', country: 'Korea'}

// 객체 구조 분해 할당을 이용해서 함수의 매개변수를 받는 방법
const func = ({ name, age, ...rest2 }) => {
  console.log(name, age, rest2);
};
func(obj);

// 배열 구조 분해 할당을 이용해서 함수의 매개변수를 받는 방법
const func2 = ([a, b, c, ...rest]) => {
  console.log(a, b, c, rest);
};
func2(arr);
