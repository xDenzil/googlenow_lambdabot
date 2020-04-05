// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const randomInt = require("random-int");
const lam = require("lambda-calculus");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    function welcome_handler(agent) {
      agent.add(`Hi, I'm in APL mode. How can I assist?`);
    }

    function fallback_handler(agent) {
      const i = randomInt(1);
      const reply = [
        "I don't understand.",
        "Sorry I didn't get that. Would you like the Semantics Information or Lambda Calculus? You can also say 'about' for some context or 'quit' to exit at any time.",
      ];
      agent.add(reply[i]);
    }

    function about_handler(agent) {
      agent.add(
        "This is an APL class of 2019/2020 semester 2 project. Group members are Denzil Williams and Tuwanie Morgan. Would you like semantics information, or to use me as a lambda calculator?"
      );
    }

    function semantics_handler(agent) {
      agent.add("Semantics are...");
    }

    function lambda_handler(agent) {
      const input = lam.fromString("(λx.(+2x)) 5");
      const output = lam.reduce(input);
      agent.add(lam.toString(output));
    }

    function quit_handler(agent) {
      const i = randomInt(2);
      const reply = [
        "Now exiting APL mode. Goodbye.",
        "Exiting APL mode.",
        "Sure, exiting APL mode.",
      ];
      agent.add(reply[i]);
    }

    let intentMap = new Map();
    intentMap.set("welcome", welcome_handler);
    intentMap.set("fallback", fallback_handler);
    intentMap.set("about", about_handler);
    intentMap.set("semantics", semantics_handler);
    intentMap.set("quit", quit_handler);
    intentMap.set("lambda-calculus", lambda_handler);

    agent.handleRequest(intentMap);
  }
);
