let person = {
  name: 'John',
  age: 20,
};
for (let key in person) {
  console.log(key, person[key]);
}

let values = Object.values(person);
for (let value of values) {
  console.log(value);
}
