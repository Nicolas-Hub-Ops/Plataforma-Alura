require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    next();
});

mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));
app.use(routes);

const port = 3000;
app.listen(port, console.log(`The back-end runing in http://localhost:${port}`));
