import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import SeasonView from './views/season';
import SeasonsLayout from './views/seasons-layout';

export default Marionette.Object.extend({

    initialize(options) {
        this.container = options.container;
    },

    index() {
        let Seasons = Backbone.Collection.extend({
            url: window.location.href
        });

        let seasons = new Seasons();
        seasons.fetch();

        this.container.show(new SeasonsLayout({collection: seasons}));
    },

    viewSeason(seasonId) {
        let Season = Backbone.Model.extend({
            url: window.location.href
        });

        let season = new Season();
        season.fetch();

        this.container.show(new SeasonView({model: season}));
    }
});