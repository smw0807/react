// 1. 대입연산자
let var1 = 1;

// 2. 산술 연산자
let num1 = 3 + 2;
let num2 = 3 - 2;
let num3 = 3 * 2;
let num4 = 3 / 2;
let num5 = 3 % 2;
console.log(num1, num2, num3, num4, num5); // 5 1 6 1.5 1

// 3. 복학 대입 연산자
let num7 = 10;
// num7 = num7 + 20;
num7 += 20;
num7 -= 20;
num7 *= 2;
num7 /= 2;
num7 %= 2;
console.log(num7);

// 4. 증감 연산자
let num8 = 10;
// num8++;
// console.log(++num8);
console.log(num8++); // 라인이 지나고 나서 증가
console.log(num8);

// 5. 논리 연산자
let or = true || false;
let and = true && false;
let not = !true;
console.log(or, and, not); // true ,false ,false

// 6. 비교 연산자
let comp1 = 1 === 2;
let comp2 = 1 !== 2;
console.log(comp1, comp2); // false true
// == 로 비교하면 값의 자료형까지 비교하지 않고, 값 자체로만 비교한다.

let comp3 = 2 > 1;
let comp4 = 2 < 1;
let comp5 = 2 > 2;
console.log(comp3, comp4, comp5); // true false false

let comp6 = 2 >= 2;
let comp7 = 2 <= 2;
console.log(comp6, comp7); // true true
