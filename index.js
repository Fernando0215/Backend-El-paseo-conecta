require('dotenv').config();

const express =  require('express');
const debug = require('debug')('app-api:server');
const morgan = require('morgan');
const cors = require('cors');

const envconfig = require('./src/config/env.config');
const database = require('./src/config/db.config');
const mainRouter = require('./src/routes/main.router')

const app = express();
database.connect();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1', mainRouter);

const errorHandler = (err, req, res, next) => {
  debug(err);
  return res.status(err.status || 500).json({ message: err.message });
}

app.use(errorHandler);

const port = envconfig.PORT;
app.listen(port, () => {
    debug(`Server is running on port ${port}`)
  })