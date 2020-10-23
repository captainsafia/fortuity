#! /usr/bin/env node
"use strict";

const r = require("request");
const fs = require('fs');
const data = require('data');
const s = require('string');

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
var retries = 0;

function run() {
  retries = retries + 1;
  if (retries >= MAX_RETRIES) {
    function offline() {
      fs.readFile('offline.txt', function(err, data){
        if(err) throw err;
        var lines = s(data).splitLeft("\n");
        var errortries = lines[Math.floor(Math.random()*lines.length)];
        return console.log(errortries);
      });
    }
    offline();
  }
  return r(options, function(error, response, body) {
    if (error) console.error(error);
    if (response.statusCode === 200 && !!body.quoteText) {
      return console.log(`${body.quoteText.trim()} -- ${body.quoteAuthor.trim()}`);
    }
    if (response.statusCode > 200) {
      run();
    }
    if (retries === 6) {
      process.exit();
    }
  });
}

run();
