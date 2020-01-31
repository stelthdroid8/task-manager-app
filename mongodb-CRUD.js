const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//C - CREATE

// MongoClient.connect(connectionURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(client => {
//     const db = client.db(databaseName);

//     db.collection('users')
//       .insertOne({
//         name: 'Andrew',
//         age: 27
//       })
//       .then(result => {
//         console.log(`successfully added user: ${result.ops}`);
//       })
//       .catch(error => {
//         console.log(`Error occurred: ${error}`);
//       });
//   })
//   .catch(error => {
//     console.log('There has been an error connecting to the database.');
//   });

//R - Read

// MongoClient.connect(connectionURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(client => {
//     const db = client.db(databaseName);

//     db.collection('users')
//       .findOne({ name: 'Gianna' })
//       .then(result => {
//         console.log(result);
//       })
//       .catch(error => {
//         console.log('error');
//       });
//   })
//   .catch(error => {
//     console.log('connection error');
//   });

//U -UPDATE

// MongoClient.connect(connectionURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(client => {
//     const db = client.db(databaseName);

//     db.collection('tasks')
//       .updateMany(
//         { completed: true },
//         {
//           $set: {
//             completed: false
//           }
//         }
//       )
//       .then(result => {
//         console.log(result);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   })
//   .catch(error => {
//     console.log('unable to connect to the database: ', error);
//   });

// D - Delete

// MongoClient.connect(connectionURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(client => {
//     const db = client.db(databaseName);
//     db.collection('users')
//       .deleteMany({ age: 27 })
//       .then(result => {
//         console.log(`Successfully deleted user: ${result}`);
//       })
//       .catch(error => {
//         console.log('unable to delete user');
//       });
//   })
//   .catch(error => {
//     console.log('There was an error connecting to the data base');
//   });
