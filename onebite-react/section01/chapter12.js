// varA();
let varA = function () {
  console.log('varA');
};

varA();

// varB();
let varB = () => {
  console.log('varB');
};

varB();

let varC = () => 1;
console.log(varC());

let varD = (v) => v + 1;
console.log(varD(1));
