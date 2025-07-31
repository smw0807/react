// 단락 평가
function returnFalse() {
  console.log('returnFalse');
  return false;
}
function returnTrue() {
  console.log('returnTrue');
  return true;
}

// console.log(returnFalse() || returnTrue());
// console.log(returnTrue() || returnFalse());
// console.log(returnFalse() && returnTrue());
// console.log(returnTrue() && returnFalse());

function printName(person) {
  // console.log(person && person.name);
  const name = person && person.name;
  console.log(name || 'Unknown');
}

printName();
printName(null);
printName(undefined);
printName(0);
printName(1);
printName(false);
printName(true);
printName({ name: 'John' });
