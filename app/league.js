import 'font-awesome-webpack';
import './styles/league.css';

import Application from './modules/app';
import IndexRouter from './modules/index/router';
import PlayerRouter from './modules/players/router';
import SeasonRouter from './modules/seasons/router';
import TeamRouter from './modules/teams/router';

document.addEventListener('DOMContentLoaded', () => {
    let App = new Application();
    let region = App.layout.getRegion('content');

    App.Index = new IndexRouter({
        container: region
    });

    App.Teams = new TeamRouter({
        container: region
    });

    App.Players = new PlayerRouter({
        container: region
    });

    App.Seasons = new SeasonRouter({
        container: region
    });

    App.start();

});