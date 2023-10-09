const mongoose = require('mongoose');
const DB_URI = process.env.MONGO_URI;

const connectToMongoD = () => {
  // * connect to mongo with db uri
  mongoose.connect(DB_URI);

  // * on connected print connection log
  mongoose.connection.on('connected', printConnectionLog);

  // * on error print error log
  mongoose.connection.on('error', console.log);

  // * on disconnected, connect again
  mongoose.connection.on('disconnected', connectToMongoD);
};

const printConnectionLog = () => {
  console.log(`****************************
    *    Starting Server
    *    Port: ${process.env.PORT || 3000}
    *    NODE_ENV: ${process.env.NODE_ENV}
    *    Database: MongoDB
    *    DB Connection: OK\n****************************\n
  `);
};

module.exports = {
  connectToMongoD
};
