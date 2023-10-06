// function for convert string to camelCase
const onlyAlphabetsAndNumbers = (string) => {
  const stringToArray = string.split(" ");
  const stringToCamelCase = stringToArray.map((item, index) => {
    // replace all non-alphanumeric characters
    item = item.replace(/[^a-zA-Z0-9]/g, "");

    return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
  });

  return stringToCamelCase.join(" ");
};

// function for convert space to dash
const convertSpaceToDash = (string) => {
  const stringToArray = string.split(" ");
  const stringToLower = stringToArray.map((item, index) => {
    // replace all non-alphanumeric characters
    item = item.replace(/[^a-zA-Z0-9]/g, "");

    // replace all spaces with dash
    item = item.replace(/\s/g, "-");
    return item.charAt(0).toLowerCase() + item.slice(1).toLowerCase();
  });
  return stringToLower.join("-");
};

const string = "SELamAt PaGi Dunia!!";

const test1 = onlyAlphabetsAndNumbers(string);
const test2 = convertSpaceToDash(string);
console.log({
  test1,
  test2,
});
