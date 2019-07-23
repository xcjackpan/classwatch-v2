const mongoose = require('mongoose');
const { mongoAuth } = require('./mongo_auth');

const mongoUri = `mongodb+srv://${mongoAuth.user}:${mongoAuth.password}@uwclasswatch-glujo.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, { useNewUrlParser: true });
// mongoose.set('debug', true);
const db = mongoose.connection;

const WatchedSchema = mongoose.Schema(
  {
    course_code: String,
    sections: [
      {
        section_number: String,
        emails: [{ email: String, hash: String }],
      },
    ],
  },
  { collection: 'watched' },
);

const UnverifiedSchema = mongoose.Schema(
  {
    course_code: String,
    section_number: String,
    email: String,
    hash: String,
  },
  { collection: 'unverified' },
);

db.once('open', () => {
  console.log('Open!');
});

module.exports.WatchedCourses = mongoose.model('WatchedCourses', WatchedSchema);
module.exports.UnverifiedCourses = mongoose.model('UnverifiedCourses', UnverifiedSchema);
