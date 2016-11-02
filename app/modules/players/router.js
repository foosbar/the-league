import {AppRouter} from 'backbone.marionette';
import Controller from './controller';

export default AppRouter.extend({
    appRoutes: {
        'players(/)': 'index'
    },

    initialize: function (options) {
        this.controller = new Controller(options);
        console.log('Players Router init');
        //this.on('*', this.onRoute);
    },

    onRoute: function (name, path, args) {
        console.log('HomeRouter routed', name, path, args);
        //HeaderService.start();
    }
});