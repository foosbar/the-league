var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('theleague.db');

var teamLinks = function(teamId, req) {
    var teamRef = '/teams/' + teamId;
    return [{
        'rel': 'self',
        'href': req.linkto(teamRef)
    },{
        'rel': 'players',
        'href': req.linkto(teamRef + '/players')
    },{
        'rel': 'seasons',
        'href': req.linkto(teamRef + '/seasons')
    },{
        'rel': 'current-season',
        'href': req.linkto(teamRef + '/seasons/current')
    }];
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.format({
        html: function() {
            next();
        },

        json: function() {
            var teams = [];
            db.each("SELECT * FROM team", function(err, row) {
                console.log('ROW', row);
                if(row)
                    row._links = teamLinks(row.id, req);
                teams.push(row);
            }, function(err, num) {
                if(err) {
                    res.sendStatus(500, err);
                } else {
                    res.json(teams);
                }
            });
        }
    });
});

router.post('/', function(req, res, next) {

    const name = req.body.name;

    db.run("INSERT INTO team(name) VALUES ($name)", {
        $name: name
    }, function(err) {
        if(err) {
            res.sendStatus(500);
        } else {
            res.header('Location', req.linkto('/teams/' + this.lastID));
            res.sendStatus(303);
        }
    });
});

router.get('/:teamId', function(req, res, next) {
    res.format({
        html: function() {
            next();
        },

        json: function() {
            var teamId = req.params.teamId;

            db.get("SELECT * FROM team where id = $id", {$id: teamId}, function (err, row) {
                console.log('ERROR', err);
                if (err) {
                    res.sendStatus(500, err);
                    return;
                } else if (row) {
                    row._links = teamLinks(row.id, req);
                    res.json(row);
                    return;
                } else {
                    res.sendStatus(404);
                }
            });
        }
    });
});

router.get('/:teamId/players', function(req, res, next) {

    var teamId = req.params.teamId;

    res.format({
        html: function() {
            next();
        },

        json: function() {
            var players = [];
            db.each("select player.*, team_player.is_captain from player left join team_player on player.id = team_player.player_id where team_player.team_id = $teamId", { $teamId: teamId }, function(err, row) {
                if(row) {
                    var links = [{
                        rel: 'player',
                        href: req.linkto('/players/' + row.id)
                    }];
                    row.links = links;

                    // TODO add in links
                    players.push(row);
                }
            }, function(err, num) {
                if(err) {
                    res.sendStatus(500, err);
                } else {
                    res.json(players);
                }
            });
        }
    });
});

module.exports = router;
