const express = require('express');
const cors = require('cors');
const { scrapeData } = require('./scraper.js');

const app = express();
const port = 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/terms', (req, res) => {
  let terms = [];
  const date = new Date();
  const currYear = date
    .getFullYear()
    .toString()
    .slice(-2);
  const currMonth = date.getMonth();

  if (currMonth >= 1 && currMonth < 5) {
    terms = [
      `1${(parseInt(currYear, 10) - 1).toString()}5`,
      `1${(parseInt(currYear, 10) - 1).toString()}9`,
      `1${parseInt(currYear, 10).toString()}1`,
      `1${parseInt(currYear, 10).toString()}5`,
    ];
  } else if (currMonth >= 5 && currMonth < 9) {
    terms = [
      `1${(parseInt(currYear, 10) - 1).toString()}9`,
      `1${parseInt(currYear, 10).toString()}1`,
      `1${parseInt(currYear, 10).toString()}5`,
      `1${parseInt(currYear, 10).toString()}9`,
    ];
  } else {
    terms = [
      `1${(parseInt(currYear, 10) - 1).toString()}1`,
      `1${parseInt(currYear, 10).toString()}5`,
      `1${parseInt(currYear, 10).toString()}9`,
      `1${(parseInt(currYear, 10) + 1).toString()}1`,
    ];
  }

  res.send(terms);
});

app.get('/search/:term/:subject/:courseNumber', (req, res) => {
  const { term, subject, courseNumber } = req.params;
  scrapeData(term, subject.toUpperCase(), courseNumber)
    .then((results) => {
      res.send(results);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.listen(port);
