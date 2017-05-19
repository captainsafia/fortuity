#! /usr/bin/env node
'use strict';

const request = require('request');

const options = {
  url: 'http://api.forismatic.com/api/1.0/',
  method: 'POST',
  form: {
    method: 'getQuote',
    lang: 'en',
    format: 'json'
  },
  json: true
};

request(options, function(error, response, body) {
  if (error) console.error(error);
  if (response.statusCode === 200) {
    console.log(body.quoteText, '--', body.quoteAuthor);
  } else {
    console.error('Error:', response.statusCode, ':', response.statusMessage);
  }
});
