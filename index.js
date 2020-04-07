//----------------- SETUP --------------------//
"use strict";

var sl = require("./lib/simplelambda.js");
var ps = require("./speech_to_symbols.js");
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
  //----------------- AGENT FUCNTIONALITY --------------------//

  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.userInput
      ? req.body.queryResult.parameters.userInput
      : "Unable to process that.";

  var inputFromUser = req.body.queryResult.parameters.userInput;
  var responseFromBot = " ";

  if (inputFromUser.includes("lambda")) {
    var processed = ps.parseLambda(inputFromUser);
    reduce(processed);
  } else {
    reduce(inputFromUser);
  }

  function reduce(inputFromUser) {
    var term = sl.parse(inputFromUser);

    while (term) {
      console.log(term.toString());
      responseFromBot = responseFromBot + "\n" + term.toString();
      term = sl.reduce(term);
    }
    for (var i = 0; i < responseFromBot.length; i++) {
      // Replacing the backslashes with lambda symbol
      responseFromBot = responseFromBot.replace("\\", "λ");
    }
    console.log(); //newline
  }

  //----------------- RESPONSES --------------------//

  var response = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: responseFromBot,
            },
          },
        ],
      },
    },
  };

  return res.json({
    payload: response,
    //data: speechResponse,
    fulfillmentText: responseFromBot,
    speech: responseFromBot,
    displayText: responseFromBot,
  });
});

restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
