const express = require('express');
require('dotenv').config();

//db setup
const User = require('./models/user');
require('./db/mongoose');
//require in external routes
const userRoutes = require('./routes/users');

//express server setup
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//use routes required in
app.use(userRoutes);

//express server setup
app.listen(port, () => {
  console.log(`server is up on port: ${port}`);
});
