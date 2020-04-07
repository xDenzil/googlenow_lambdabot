var dict = {
  open: "(",
  close: ")",
  closed: ")",
  lambda: "~",
  x: "x",
  y: "y",
  why: "y",
  by: "y",
  z: "z",
  a: "a",
  b: "b",
  c: "c",
  // space: " ",
  period: ".",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
};

var accepted = [
  "open",
  "close",
  "closd",
  "lambda",
  "x",
  "y",
  "z",
  "a",
  "b",
  "c",
  "why",
  "by",
  // "space",
  ".",
  "period",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

var i = 0;
var j = 0;

function parseLambda(input) {
  var inputString = input;
  var processedString = "";
  var split = inputString.split(" ");

  for (i = 0; i < split.length; i++) {
    for (j = 0; j < accepted.length; j++) {
      if (split[i].toLowerCase() == accepted[j]) {
        processedString += dict[split[i].toLowerCase()];
      }
    }
  }
  return processedString;
}

module.exports = {
  parseLambda: parseLambda,
};
