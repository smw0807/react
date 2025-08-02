function add(a, b, callback) {
  setTimeout(() => {
    const sum = a + b;
    // console.log(sum);
    callback(sum);
  }, 3000);
}

add(1, 2, (value) => {
  // console.log(value);
});

function orderFood(callback) {
  setTimeout(() => {
    const food = '피자';
    callback(food);
  }, 3000);
}

function coolDownFood(food, callback) {
  setTimeout(() => {
    const coolDownedFood = `식은 ${food}`;
    callback(coolDownedFood);
  }, 2000);
}

function freezeFood(food, callback) {
  setTimeout(() => {
    const freezedFood = `냉동된 ${food}`;
    callback(freezedFood);
  }, 1500);
}
orderFood((food) => {
  console.log(food);

  coolDownFood(food, (coolDownedFood) => {
    console.log(coolDownedFood);

    freezeFood(coolDownedFood, (freezedFood) => {
      console.log(freezedFood);
    });
  });
});
