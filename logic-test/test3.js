// get user input from cli
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Input banyaknya deret: ", (input) => {
  // input must be integer
  if (isNaN(input)) {
    console.log("Input must be integer");
  }

  const deret1 = [];
  const deret2 = [1];
  const deret3 = [];
  const ganjil = [];

  // generate ganjil squeance
  for (let i = 1; i <= input; i++) {
    ganjil.push(i * 2 - 1);
  }

  // loop for deret1
  for (let i = 1; i <= input; i++) {
    deret1.push(i * i);
  }

  // loop for deret2
  for (let i = 1; i <= input; i++) {
    if (i === 0) {
      deret2.push(1);
    } else {
      deret2.push(i + ganjil[i - 1]);
    }
  }

  // loop for deret3
  for (let i = 1; i <= input; i++) {
    deret3.push(i * 3);
  }

  console.log({
    deret1,
    deret2,
    ganjil,
  });

  rl.close();
});
