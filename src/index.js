const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

require('dotenv').config();

//require in external routes
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

//express server setup
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//use routes required in
app.use(userRoutes);
app.use(taskRoutes);

//express server setup
app.listen(port, () => {
  console.log(`server is up on port: ${port}`);
});
