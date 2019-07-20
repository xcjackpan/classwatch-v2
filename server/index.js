const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { scrapeData } = require('./scraper.js');
const { WatchedCourses, UnverifiedCourses } = require('./db/db.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

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


// mongo

app.post('/watch', (req, res) => {
  console.log(req.body.data);
  const { course, email } = req.body.data;
  const unverifiedCourse = new UnverifiedCourses({
    course_code: 'course code',
    sections: [
      {
        section_number: 'number',
        emails: [
          {
            email: 'email',
            hash: 'hash',
          },
        ],
      },
    ],
  });
  unverifiedCourse.save((err) => {
    if (err) res.sendStatus(500);
    else res.sendStatus(201);
  });
});

app.post('/verify/:hash', (req, res) => {
  console.log('verify');
  res.sendStatus(200);
});

app.listen(port);
