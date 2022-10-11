require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const createError = require('http-errors');

require('./config/db.config');

const app = express();

app.use(logger('dev'));
app.use(express.json());