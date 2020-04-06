"use strict";

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

  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: "Oh",
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
