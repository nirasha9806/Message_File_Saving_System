const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

//BodyParser Middleware
app.use(bodyParser.json());

//routes
const checkAuth = require('./middleware/check-auth');
const userRoutes = require('./routes/user-route');
const messageRoutes = require('./routes/message-route');
const loginRoutes = require('./routes/login-route');
const fileRoutes = require('./routes/file-route');

app.use('/api/login', loginRoutes);
app.use('/api/users', userRoutes);
app.use(checkAuth);
app.use('/api/message', messageRoutes);
app.use('/api/file', fileRoutes);

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
