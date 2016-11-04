import {AppRouter} from 'backbone.marionette';
import Controller from './controller';
import Radio from 'backbone.radio';

export default AppRouter.extend({
    appRoutes: {
        'seasons(/)': 'index',
        'seasons/:seasonId': 'viewSeason'
    },

    initialize: function (options) {
        this.controller = new Controller(options);
    },

    onRoute: function (name, path, args) {
        Radio.channel('topnav').trigger('highlight:link', 'seasons');
    }
});