const string = "20, 21, 80, 21, 55, 31, 22";
const stringToArray = string.split(", ");

// convert array to number
const arr = stringToArray.map((item) => Number(item));

// get the highest value of arr
const max = Math.max(...arr);

// get the lowest value of arr
const min = Math.min(...arr);

// get the average value of arr
const average = arr.reduce((a, b) => a + b, 0) / arr.length;

console.log({
  max,
  min,
  average,
});
