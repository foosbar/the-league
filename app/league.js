import $ from 'jquery';
import Backbone from 'backbone';
//import Marionette from 'backbone.marionette';
import './styles/league.css';

import Application from './modules/app';
import PlayerRouter from './modules/players/router';
import TeamRouter from './modules/teams/router';

document.addEventListener('DOMContentLoaded', () => {
    let App = new Application();

    App.Teams = new TeamRouter({
        container: App.layout.getRegion('content')
    });

    App.Players = new PlayerRouter({
        container: App.layout.getRegion('content')
    });

    App.start();
});