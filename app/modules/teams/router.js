import {AppRouter} from 'backbone.marionette';
import Controller from './controller';
import Radio from 'backbone.radio';

export default AppRouter.extend({
    appRoutes: {
        'teams/create': 'createForm',
        'teams/:teamId(/)': 'viewTeam',
        'teams(/)': 'index'
    },

    initialize: function (options) {
        this.controller = new Controller(options);
    },

    onRoute: function (name, path, args) {
        console.log('onRoute', arguments);
        Radio.channel('topnav').trigger('highlight:link', 'teams');
    }
});