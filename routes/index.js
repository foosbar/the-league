var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    res.format({
        html: function () {
            res.render('index');
        }, json: function () {
            var links = [{
                rel: 'players',
                href: req.linkto('/players'),
                icon: 'fa fa-user'
            }, {
                rel: 'teams',
                href: req.linkto('/teams'),
                icon: 'fa fa-users'
            }, {
                rel: 'seasons',
                href: req.linkto('/seasons'),
                icon: 'fa fa-calendar'
            }];
            res.json(links);
        }
    });
});

module.exports = router;
