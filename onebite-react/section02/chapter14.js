async function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'John',
        age: 20,
      });
    }, 1500);
  });
}

async function printData() {
  const data = await getData();
  console.log(data);
}

printData();
