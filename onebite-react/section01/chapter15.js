// 1. 객체 생성
let obj1 = new Object(); //객체 생성자
let obj2 = {}; //객체 리터럴 (대부분 사용)

// 2. 객체 프로퍼티(객체 속성)
let person = {
  name: '송민우',
  age: 34,
  hobby: '코딩',
  'like-cat': true,
  like_dog: true,
};

let name = person.name;
let age = person['age'];

person.job = 'Developer';
person['favorite-color'] = 'black';

delete person.like_dog;
delete person['like-cat'];
console.log(person);

// 프로퍼티 존재 유무 확인하는 방법 (in 연산자)
let result1 = 'name' in person;
let result2 = 'like-cat' in person;
console.log(result1);
console.log(result2);
