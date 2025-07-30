// 상수 객체
const person = {
  name: '송민우',
  age: 34,
};

person.name = '송민우2';
console.log(person);

// 메서드
// -> 값이 함수인 프로퍼티

const person2 = {
  name: '송민우',
  age: 34,
  sayHello() {
    // 메서드 선언
    console.log('안녕하세요');
  },
};

person2.sayHello();
person2['sayHello']();
