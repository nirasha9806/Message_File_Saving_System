const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

//BodyParser Middleware
app.use(bodyParser.json());

//DB config
const db = process.env.MONGODB_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port));
