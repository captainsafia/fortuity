#! /usr/bin/env node
"use strict";

const r = require("request");

const options = {
  url: "http://api.forismatic.com/api/1.0/",
  method: "POST",
  form: {
    method: "getQuote",
    lang: "en",
    format: "json"
  },
  json: true
};

const MAX_RETRIES = 5;
let retries = 0;

function run() {
  retries = retries + 1;
  if (retries >= MAX_RETRIES) {
    return console.log(`timeout after ${MAX_RETRIES}`);
  }
  return r(options, function(error, response, body) {
    if (error) console.error(error);
    if (response.statusCode === 200 && !!body.quoteText) {
      return console.log(`${body.quoteText.trim()} -- ${body.quoteAuthor.trim()}`);
    }
    if (response.statusCode > 200) {
      return console.error(
        `Error: ${response.statusCode} - ${response.statusMessage}`
      );
    }
    if (!body.quoteText || !body.quoteAuthor) {
      run();
    }
  });
}

run();
