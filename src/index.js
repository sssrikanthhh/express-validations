const express = require('express');

const connectDB = require('./configs/db');
const userController = require('./controllers/user.controllers');

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/users', userController);

connectDB();
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});