const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  res.end("Hello");
  //console.log(dict["Close Bracket"]);
});

LPAREN: "(";
RPAREN: ")";
LAMBDA: "λ"; /* we'll also allow `\` for convenience */
DOT: ".";
// lowercase identifier: lowercase letter followed by any letters
//LCID: /[a-z][a-zA-Z]*/

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
