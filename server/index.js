const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { scrapeData } = require('./scraper.js');
const { WatchedCourses, UnverifiedCourses } = require('./db/db.js');

// Text to cipher
function btoa(text) {
  return Buffer.from(text).toString('base64');
}

// Cipher to text
function atob(cipher) {
  return Buffer.from(cipher, 'base64').toString();
}

// Takes a removal code and decrypts
function decode(removalCode) {
  const decoded = atob(removalCode);
  const array = decoded.split('|');
  return {
    courseCode: array[0],
    sectionNumber: array[1],
    email: array[2],
  };
}

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

app.post('/watch', (req, res) => {
  const { course, sections, email } = req.body;
  const unverified = sections.map(section => new UnverifiedCourses({
    course_code: course,
    section_number: section,
    email,
    hash: btoa(`${course}|${section}|${email}`),
  }));
  // Send emails here
  UnverifiedCourses.insertMany(unverified, (err) => {
    if (err) res.sendStatus(500);
    else res.sendStatus(201);
  });
});

app.delete('/remove', (req, res) => {
  const { removalCode } = req.params;
  const {
    courseCode, sectionNumber, email,
  } = decode(removalCode);
  WatchedCourses.updateOne(
    { course_code: courseCode },
    { $pull: { 'sections.$[section].emails': { email, removalCode } } },
    { arrayFilters: [{ 'section.section_number': sectionNumber }] },
    (err, succ) => {
      if (err) console.log(err);
      console.log(succ);
    },
  );
  res.sendStatus(200);
});

app.get('/verify/:hash', (req, res) => {
  UnverifiedCourses.findOne({ hash: req.params.hash }, (unverifiedFindErr, doc) => {
    // check if the course exists
    if (!doc) return;
    WatchedCourses.findOne({ course_code: doc.course_code },
      async (watchedCoursesFindErr, foundCourse) => {
      // if it doesn't exist, create new doc for that course
        await UnverifiedCourses.deleteOne(
          { hash: doc.hash },
          (err) => {
            if (err) console.log(err);
          },
        );
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
        WatchedCourses.aggregate([
          { $match: { course_code: doc.course_code } },
          { $unwind: '$sections' },
          { $match: { 'sections.section_number': doc.section_number } },
        ], async (watchedCoursesAggregateErr, foundSection) => {
          // if it doesn't exist, push the section number into the array
          if (!foundSection || !foundSection.length) {
            await WatchedCourses.updateOne(
              { course_code: doc.course_code },
              { $addToSet: { sections: { section_number: doc.section_number, emails: [] } } },
              (err) => {
                if (err) console.log(err);
              },
            );
          }
          // add the email to the array
          WatchedCourses.updateOne(
            { course_code: doc.course_code },
            { $addToSet: { 'sections.$[section].emails': { email: doc.email, hash: doc.hash } } },
            { arrayFilters: [{ 'section.section_number': doc.section_number }] },
            (err) => {
              if (err) console.log(err);
            },
          );
        });
      });
  });
  res.sendStatus(200);
});

app.listen(port);
