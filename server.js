const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const app = express();

// config
const config = require('config');
const localDevMode = config.get('localDevMode');
const debug = config.get('debug');

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * CSRF
 */
app.use(csrf({cookie: true}));
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
    }

    // handle CSRF token errors here
    res.status(403);
    res.send(debug ? 'Missing CSRF Token' : null);
});

/**
 * Serve from sources/desktop when localDevMode is true
 */
if (localDevMode) {
    app.use(express.static(path.join(__dirname, 'sources/desktop')));
}

/**
 * ROUTES
 */
Object.entries(require('./server/routes')).forEach(([route, handler]) => {
    app.use(route, handler);
});

/**
 * ERROR HANDLING
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
