const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  res.end("Hello");
  //console.log(dict["Close Bracket"]);
});

const inputString =
  "Open bracket lambda x dot x close bracket Space open Bracket lambda y dot y close bracket close bracket";

var dict = {
  open: "(",
  close: ")",
  lambda: "λ",
  x: "x",
  y: "y",
  z: "z",
  a: "a",
  b: "b",
  c: "c",
  space: " ",
  dot: ".",
};

var accepted = [
  "open",
  "close",
  "lambda",
  "x",
  "y",
  "z",
  "a",
  "b",
  "c",
  "space",
  "dot",
];

var processedString = "";
var split = inputString.split(" ");

for (i = 0; i < split.length; i++) {
  for (j = 0; j < accepted.length; j++) {
    if (split[i].toLowerCase() == accepted[j]) {
      processedString += dict[split[i].toLowerCase()];
    }
  }
}

console.log("String:" + processedString);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
