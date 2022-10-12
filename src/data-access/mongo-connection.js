const Mongoose = require('mongoose');

class Mongo {
  constructor() {
    this.uri = 'mongodb://localhost:27017';

    const options = {
      autoIndex: false,
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    Mongoose
      .connect(
        this.uri,
        options
      )
      .then(
        () => {
          console.info(`Worker ${process.pid} connected to Mongo Database`);
        },
        err => {
          console.error(`Worker ${process.pid} failed connecting to Mongo Database: ${err}`);
        }
      );
    return Mongoose;
  }
}

module.exports = Mongo;
