const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const num = 10;
    if (typeof num === 'number') {
      resolve(num + 10);
    } else {
      reject('num이 숫자가 아닙니다.');
    }
  }, 2000);
});

// promise
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

function add10(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof num === 'number') {
        resolve(num + 10);
      } else {
        reject('num이 숫자가 아닙니다.');
      }
    }, 2000);
  });
}

add10(10)
  .then((value) => {
    console.log(value);
    return add10(value);
  })
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
