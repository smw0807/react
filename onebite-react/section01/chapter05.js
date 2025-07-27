console.log(undefined === null);

const a = 1;
const b = `${a}`;
console.log(a, typeof a);
console.log(b, typeof b);

const str = '10개';
const sttToNum = parseInt(str);
const strToNum2 = Number(str);
console.log(sttToNum, typeof sttToNum); //10 number
console.log(strToNum2, typeof strToNum2); // NaN number
