const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const Routes = require('./routes');
const path = require('path');
// middleware
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(helmet());
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://book-store-five-theta.vercel.app',
  'https://book-store-admin-ruby.vercel.app',
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the request origin is in the allowedOrigins array or if it's a request from the same origin (null).
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
// database

//doc duong dan static
app.use(express.static(path.join(__dirname, '../../public')));
// router
Routes(app);
// hanle error

module.exports = app;
