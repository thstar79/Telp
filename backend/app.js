const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const {ValidationError} = require('sequelize');

const indexRouter = require('./routes/index');
const res = require('express/lib/response');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if(!isProduction) {
    app.use(cors());
}

app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}))

//Router setting
app.use(indexRouter);

//error handling
app.use((req, res, next)=>{
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    console.log("there");
    next(err);
});

app.use((err, req,res, next)=>{
    if(err instanceof ValidationError) {
        err.errors = err.errors.map((e)=>e.message);
        err.title = 'Validation error';
    }
    next(err);
});

app.use((err, req, res, next)=>{
    console.log("here");
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? nuill : err.stack
    });
});

module.exports = app;