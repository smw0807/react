// 1. Date 객체를 생성하는 방법
let date1 = new Date();
// console.log(date1);

let date2 = new Date('2025-08-01');
// console.log(date2);

// 2. 타임 스탬프
// 특정 시간이 UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 흐른 밀리초 단위의 숫자값
let ts1 = date1.getTime();
// console.log(ts1);
let date3 = new Date(ts1);
// console.log(date1, date3);

// 3. 시간 요소들을 추출하는 방법
let year = date1.getFullYear();
let month = date1.getMonth() + 1;
let date = date1.getDate();

let hour = date1.getHours();
let minute = date1.getMinutes();
let second = date1.getSeconds();
// console.log(year, month, date, hour, minute, second);

// 4. 시간 수정하기
// date1.setFullYear(2025);
// date1.setMonth(1);
// date1.setDate(1);
// date1.setHours(0);
// date1.setMinutes(0);
// date1.setSeconds(0);
// console.log(date1);

// 5. 시간을 여러 포맷으로 출력하기
console.log(date1.toDateString());
console.log(date1.toLocaleString());
