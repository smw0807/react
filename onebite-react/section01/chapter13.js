// 콜백 함수
// 자신이 아닌 다른 함수에, 인수로써 전달된 함수를 의미함

function main(value) {
  value();
}
function sub() {
  console.log('sub');
}

main(sub);

main(() => {
  console.log('sub2');
});

// 콜백 함수의 활용
function repeat(count, callback) {
  for (let idx = 1; idx <= count; idx++) {
    // console.log(`${idx}번째 반복`);
    callback(idx);
  }
}
// function repeatDouble(count) {
//   for (let idx = 1; idx <= count; idx++) {
//     console.log(`${idx * 2}번째 반복`);
//   }
// }
// function repeatTriple(count) {
//   for (let idx = 1; idx <= count; idx++) {
//     console.log(`${idx * 3}번째 반복`);
//   }
// }
// repeat(5);
// repeatDouble(5);
repeat(5, (idx) => {
  console.log(idx);
});

repeat(5, (idx) => {
  console.log(idx * 2);
});
repeat(5, (idx) => {
  console.log(idx * 3);
});
