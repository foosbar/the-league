import {AppRouter} from 'backbone.marionette';
import Controller from './controller';
import Radio from 'backbone.radio';

export default AppRouter.extend({
    appRoutes: {
        '*path': 'index'
    },

    initialize: function (options) {
        this.controller = new Controller(options);
    },

    onRoute: function (name, path, args) {
        Radio.channel('topnav').trigger('highlight:link', 'index');
    }
});