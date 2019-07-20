const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
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
  console.log(req.body);
  const { course, sections, email } = req.body;
  const unverified = sections.map(section => new UnverifiedCourses({
    course_code: course,
    section_number: section,
    email,
    hash: crypto.randomBytes(20).toString('hex'),
  }));
  // Send emails here
  UnverifiedCourses.insertMany(unverified, (err) => {
    if (err) res.sendStatus(500);
    else res.sendStatus(201);
  });
});

app.get('/verify/:hash', (req, res) => {
  console.log('HIT');
  UnverifiedCourses.findOne({ hash: req.params.hash }, (unverifiedFindErr, doc) => {
    // check if the course exists
    WatchedCourses.findOne({ course_code: doc.course_code },
      async (watchedCoursesFindErr, foundCourse) => {
      // if it doesn't exist, create new doc for that course
        if (!foundCourse) {
          const createCoursePromise = new Promise((resolve, reject) => {
            WatchedCourses.create({
              course_code: doc.course_code,
            }, (err) => {
              if (err) reject();
              resolve();
            });
          });
          await createCoursePromise;
        }
        // check if the section number exists
        await WatchedCourses.aggregate([
          { $match: { course_code: doc.course_code } },
          { $unwind: '$section' },
          { $match: { 'section.section_number': doc.section_number } },
        ], async (watchedCoursesAggregateErr, foundSection) => {
          // if it doesn't exist, push the section number into the array
          console.log(foundSection);
          if (!foundSection || !foundSection.length) {
            await WatchedCourses.updateOne(
              { course_code: doc.course_code },
              { $push: { sections: { section_number: doc.section_number, emails: [] } } },
            );
          }
          // add the email to the array
          console.log(doc.section_number);
          WatchedCourses.updateOne(
            { course_code: doc.course_code },
            { $push: { 'sections.$[section].emails': { email: doc.email, hash: doc.hash } } },
            { arrayFilters: [{ 'section.section_number': doc.section_number }] },
          );
          UnverifiedCourses.deleteOne({ hash: doc.hash }, (err, succ) => {
            if (err) {
              console.log(err);
            } else {
              console.log(succ);
            }
          });
        });
      });
  });
  res.sendStatus(200);
});

app.listen(port);
