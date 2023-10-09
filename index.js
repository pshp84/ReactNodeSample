require('dotenv/config');
const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const { connectToMongoD } = require('./config/mongo.config');
const app = express();
app.set('port', process.env.PORT || 3000);


// * for parsing json
app.use(express.json({
  limit: '20mb'
}));

// * for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({
  limit: '20mb',
  extended: true
}));

// * for handling multipart form data
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  debug: true,
}));

app.use(cors());

// * helps protect your server from some well-known web vulnerabilities by setting HTTP response headers appropriately
app.use(helmet());

app.use('/api', require('./app/routes'));

app.listen(app.get('port'));

connectToMongoD();