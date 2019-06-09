import { scrapeData } from './scraper';

const express = require('express');

const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/search/:term/:subject/:courseNumber', (req, res) => {
  const { term, subject, courseNumber } = req.params;
  res.send(scrapeData(term, subject, courseNumber));
});

app.listen(port);
