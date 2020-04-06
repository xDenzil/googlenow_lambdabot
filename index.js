"use strict";

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
/* 
function parseLambda(input) {
  var inputString = input;
  var processedString = "";
  var split = inputSring.split(" ");

  for (i = 0; i < split.length; i++) {
    for (j = 0; j < accepted.length; j++) {
      if (split[i].toLowerCase() == accepted[j]) {
        processedString += dict[split[i].toLowerCase()];
      }
    }
  }

  return "Oh";
} */

function parseLambda() {
  return "Oh";
}

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

restService.use(bodyParser.json());
console.log(speech);

restService.post("/echo", function (req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.userInput
      ? req.body.queryResult.parameters.userInput
      : "Unable to process that.";

  var parseResults = parseLambda();

  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: parseResults,
            },
          },
        ],
      },
    },
  };

  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "google-now-lambda-bot",
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
