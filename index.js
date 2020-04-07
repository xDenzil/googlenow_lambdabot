"use strict";
var sl = require("./lib/simplelambda.js");

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
  ".",
];

var i = 0;
var j = 0;

function reduce(text) {
  var term = sl.parse(text);

  while (term) {
    console.log(term.toString());
    term = sl.reduce(term);
  }

  //console.log(); //newline
}

// function a(num1, num2) {
//   console.log(num1 + num2);
// }

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

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function (req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.userInput
      ? req.body.queryResult.parameters.userInput
      : "Unable to process that.";

  //var parseResults = reduce(req.body.queryResult.parameters.userInput);
  var lambdaString = req.body.queryResult.parameters.userInput;
  var responseToUser = "dog";
  var response = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: responseToUser,
            },
          },
        ],
      },
    },
  };

  return res.json({
    payload: response,
    //data: speechResponse,
    fulfillmentText: responseToUser,
    speech: responseToUser,
    displayText: responseToUser,
  });

  /* var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: reduce(lambdaString),
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
  }); */
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
