const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (error, client) => {
//     if (error) {
//       return console.log('Unable to connect to database!');
//     }

//     const db = client.db(databaseName);

//     db.collection('users').insertOne({
//       name: 'Brandon',
//       age: '25'
//     });

//   }
// );

MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(client => {
  const db = client.db(databaseName);
  db.collection('users')
    .insertOne({
      name: 'Joe',
      age: '25'
    })
    .then(result => {
      console.log(result.ops);
    })
    .catch(err => {
      console.log(err);
    });
});
