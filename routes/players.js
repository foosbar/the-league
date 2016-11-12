var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('theleague.db');
var md5 = require('md5');

function generateGravatarUrl(email, size) {
    if(email) {
        var hash = md5(email.trim().toLowerCase());
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=wavatar`;
    }
    return null;
}

router.post('/', function(req, res, next) {
    console.log('REQ', req.body);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    db.run("INSERT INTO player(firstName, lastName, email) VALUES ($firstName, $lastName, $email)", {
        $firstName: firstName,
        $lastName: lastName,
        $email: email
    }, function(err) {
        if(err) {
            res.sendStatus(500);
        } else {
            res.header('Location', req.linkto('/players/' + this.lastID));
            res.sendStatus(303);
        }
    });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.format({
        html: function() {
            res.render('index');
        },

        json: function() {
            var users = [];
            db.each("SELECT * FROM player order by firstName ASC", function (err, row) {
                console.log('ROW', row);
                if (row) {
                    row.href = req.linkto('/players/' + row.id);
                    let gravatarUrl = generateGravatarUrl(row.email, 24);
                    if(gravatarUrl) {
                        row.gravatarUrl = gravatarUrl;
                    }
                    users.push(row);
                }
            }, function (err, num) {
                console.log('Args', arguments);
                if (err) {
                    res.sendStatus(500, err);
                } else {
                    res.json(users);
                }
            });
        }
    });
});

router.get('/:playerId', function(req, res, next) {

    res.format({
        html: function() {
            res.render('index');
        },

        json: function() {
            var playerId = req.params.playerId;

            db.get("SELECT * FROM player where id = $id", { $id: playerId }, function(err, row) {
                console.log('ERROR', err);
                if(err) {
                    res.sendStatus(500, err);
                } else if(row) {
                    row.href = req.linkto('/players/' + row.id);
                    let gravatarUrl = generateGravatarUrl(row.email, 64);
                    if(gravatarUrl) {
                        row.gravatarUrl = gravatarUrl;
                    }
                    res.json(row);
                } else {
                    res.sendStatus(404);
                }
            });
        }
    });
});

module.exports = router;
