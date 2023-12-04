const debug = require('debug')('app-api:db');
const mongoose = require('mongoose');
const envconfig = require('./env.config')
const uri = envconfig.MONGO_URI;

const connect = async () => {
    try {
      await mongoose.connect(uri);
      debug('Connected successfully to database!');
    } catch (error) {
      debug("[Error]: Can't connect to database!");
    }
  }

const disconnect = async () => {
    try {
      await mongoose.disconnect()
      debug('Connection to database end')
    } catch (error) {
      process.exit(1);
    }
  }

  module.exports = { connect, disconnect };

