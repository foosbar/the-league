var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(':memory:');
var db = new sqlite3.Database('theleague.db');

db.serialize(function() {

    // Player Tables
    db.run(`
        CREATE TABLE IF NOT EXISTS player (
            id INTEGER PRIMARY KEY NOT NULL, 
            firstName TEXT, 
            lastName TEXT, 
            email TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS player_login (
            id INTEGER, 
            passwd TEXT, 
            CONSTRAINT fk_player_id FOREIGN KEY (id) REFERENCES player(id)
        )
    `);

    // Team - Meta Information about each team
    db.run(`
        CREATE TABLE IF NOT EXISTS team (
            id INTEGER PRIMARY KEY NOT NULL, 
            name TEXT, 
            created_date DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS team_player (
            id INTEGER PRIMARY KEY NOT NULL, 
            team_id INTEGER NOT NULL, 
            player_id INTEGER NOT NULL, 
            is_captain INTEGER NOT NULL DEFAULT 0,
            CONSTRAINT fk_team_team_id FOREIGN KEY (team_id) REFERENCES team(id),
            CONSTRAINT fk_team_player_id FOREIGN KEY (player_id) REFERENCES player(id)
        )
    `);

    // Season Tables
    db.run(`
        CREATE TABLE IF NOT EXISTS season (
            id INTEGER PRIMARY KEY NOT NULL, 
            season INTEGER NOT NULL, 
            created_DATE DATETIME
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS season_game(
            id INTEGER PRIMARY KEY NOT NULL,
            game_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            season_id INTEGER NOT NULL,
            CONSTRAINT fk_sg_season_id FOREIGN KEY (season_id) REFERENCES season(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS season_team(
            id INTEGER PRIMARY KEY NOT NULL,
            season_id INTEGER NOT NULL,
            team_id INTEGER NOT NULL,
            CONSTRAINT fk_st_season_id FOREIGN KEY (season_id) REFERENCES season(id),
            CONSTRAINT fk_st_team_id FOREIGN KEY (team_id) REFERENCES team(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS season_score(
            id INTEGER PRIMARY KEY NOT NULL,
            season_id INTEGER NOT NULL,
            game_id INTEGER NOT NULL,
            game_no INTEGER NOT NULL,
            team_id INTEGER NOT NULL,
            player_id INTEGER NOT NULL,
            score INTEGER DEFAULT 0,
            is_andre INTEGER NOT NULL DEFAULT 0,
            CONSTRAINT fk_ss_season_id FOREIGN KEY (season_id) REFERENCES season(id),
            CONSTRAINT fk_ss_game_id FOREIGN KEY (game_id) REFERENCES season_game(id),
            CONSTRAINT fk_ss_player_id FOREIGN KEY (player_id) REFERENCES player(id),
            CONSTRAINT fk_ss_team_id FOREIGN KEY (team_id) REFERENCES team(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS player_substitute (
            id INTEGER PRIMARY KEY NOT NULL,
            player_id INTEGER NOT NULL,
            for_player_id INTEGER NOT NULL,
            score_id INTEGER NOT NULL,
            CONSTRAINT fk_ps_player_id FOREIGN KEY (player_id) REFERENCES player(id),
            CONSTRAINT fk_ps_for_player_id FOREIGN KEY (for_player_id) REFERENCES player(id),
            CONSTRAINT fk_ps_score_id FOREIGN KEY (score_id) REFERENCES season_score(id)
        )
    `);
});

db.close();