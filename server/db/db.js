const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/uwclasswatch', { useNewUrlParser: true });
// mongoose.set('debug', true);
const db = mongoose.connection;

const WatchedSchema = mongoose.Schema(
  {
    course_code: String,
    sections: [
      {
        section_number: String,
        emails: [String],
      },
    ],
  },
  { collection: 'watched' },
);

const UnverifiedSchema = mongoose.Schema(
  {
    course_code: String,
    sections: [
      {
        section_number: String,
        emails: [
          {
            email: String,
            hash: String,
          },
        ],
      },
    ],
  },
  { collection: 'unverified' },
);

db.once('open', () => {
  console.log('Open!');
});

module.exports.WatchedCourses = mongoose.model('WatchedCourses', WatchedSchema);
module.exports.UnverifiedCourses = mongoose.model('UnverifiedCourses', UnverifiedSchema);
