var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('theleague.db');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.format({
        html: function() {
            res.render('index');
        },

        json: function() {
            var users = [];
            db.each("SELECT * FROM player", function (err, row) {
                console.log('ROW', row);
                if (row)
                    users.push(row);
            }, function (err, num) {
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

    var playerId = req.params.playerId;

    db.get("SELECT * FROM player where id = $id", { $id: playerId }, function(err, row) {
        console.log('ERROR', err);
        if(err) {
            res.sendStatus(500, err);
        } else if(row) {
            res.json(row);
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;
