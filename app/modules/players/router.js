import {AppRouter} from 'backbone.marionette';
import Controller from './controller';
import Radio from 'backbone.radio';

export default AppRouter.extend({
    appRoutes: {
        'players(/)': 'index',
        'players/:playerId': 'viewPlayer'
    },

    initialize: function (options) {
        this.controller = new Controller(options);
        console.log('Players Router init');
    },

    onRoute: function (name, path, args) {
        console.log('HomeRouter routed', name, path, args);
        Radio.channel('topnav').trigger('highlight:link', 'players');
    }
});