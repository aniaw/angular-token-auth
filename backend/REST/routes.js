var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var config = require('../config');

module.exports = function (app)
{
    app.post('/api/authenticate', function (req, res)
    {
        if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
            res.status(401).send('Wrong user or password');
            return;
        }

        var profile = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@doe.com',
            id: 123
        };

        // We are sending the profile inside the token
        var token = jwt.sign(profile, config.secret, {expiresInMinutes: 60 * 5});
        res.json({token: token});
    });

    app.get('/api/authenticate/test', function (req, res)
    {
        console.log('user ' + req.user.email + ' is calling /api/authenticate/test');
        res.json({
            name: 'hurra!'
        });
    });
};
