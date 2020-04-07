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
