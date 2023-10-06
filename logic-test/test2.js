const string = "aabbbahwws";
const stringToArray = string.split("");

// get unique value from array and
const res = [...new Set(stringToArray)].map((item) => {
  return {
    [item]: stringToArray.filter((i) => i === item).length,
  };
});

console.log(res);
