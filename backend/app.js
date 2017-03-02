var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

var routes = require('./REST/routes');
var config = require('./config');

module.exports = function ()
{
    var app = express();

    // We are going to protect /api routes with JWT
    app.use('/api', expressJwt({secret: config.secret}));

    app.use(bodyParser.json());
    app.use('/', express.static(__dirname + '/../frontend/app'));

    app.use(function (err, req, res, next)
    {
        if (err.constructor.name === 'UnauthorizedError') {
            res.status(401).send('Unauthorized');
        }
    });

    routes(app);

    app.listen(config.port, function ()
    {
        console.log('listening on http://localhost:' + config.port);
    });

};
