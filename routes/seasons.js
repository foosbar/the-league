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
            var season = [];

            db.each("SELECT * FROM season", function(err, row) {
                if(row) {
                    row.games = req.linkto('/seasons/' + row.id + '/games');
                    row.teams = req.linkto('/seasons/' + row.id + '/teams');
                    row.href = req.linkto('/seasons/' + row.id);
                    season.push(row);
                }
            }, function(err, num) {
                if(err) {
                    res.sendStatus(500, err);
                } else {
                    res.json(season);
                }
            });
        }
    });
});

router.get('/:seasonId', function(req, res, next) {

    var seasonId = req.params.seasonId;

    db.get("SELECT * FROM season where id = $id", { $id: seasonId }, function(err, row) {
        console.log('ERROR', err);
        if(err) {
            res.sendStatus(500, err);
        } else if(row) {
            row.games = req.linkto('/seasons/' + row.id + '/games');
            row.teams = req.linkto('/seasons/' + row.id + '/teams');
            res.json(row);
        } else {
            res.sendStatus(404);
        }
    });
});

router.get('/:seasonId/games', function(req, res, next) {

    var seasonId = req.params.seasonId;
    var games = [];

    db.serialize(function() {
        console.log('Fetching games for season ', seasonId);
        db.each("select season_game.* from season_game where season_game.season_id = $seasonId", {$seasonId: seasonId}, function (err, row) {
            if (row) {
                console.log('ROW', row);
                games.push(row);
            }
        });

        for( var x = 0; x < games.length; x++) {
            console.log('Fetching scores for game ', games[x]);
            games[x].scores = [];

            db.each("select * from season_score where season_id = $seasonId and game_id = $gameId", { $seasonId: seasonId, $gameId: games[x].id }, function(err, row) {
                games[x].scores.push(row);
            });
        }
        res.json(games);
    });

});

router.get('/:seasonId/teams', function(req, res, next) {

    var seasonId = req.params.seasonId;
    var teams = [];
    db.each("select team.* from team left join season_team on team.id = season_team.team_id where season_team.season_id = $seasonId", { $seasonId: seasonId }, function(err, row) {
        if(row) {
            row.href = req.linkto('/teams/' + row.id);
            teams.push(row);
        }
    }, function(err, num) {
        if(err) {
            res.sendStatus(500, err);
        } else {
            res.json(teams);
        }
    });
});

module.exports = router;
