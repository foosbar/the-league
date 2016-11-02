import {AppRouter} from 'backbone.marionette';
import Controller from './controller';

export default AppRouter.extend({
    appRoutes: {
        'teams(/)': 'index'
    },

    initialize: function (options) {
        this.controller = new Controller(options);
    },

    onRoute: function (name, path, args) {
        //console.log('HomeRouter routed', name, path, args);
        //HeaderService.start();
    }
});