import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import PlayersView from './views/players';

export default Marionette.Object.extend({

    initialize(options) {
        this.container = options.container;
    },

    index() {
        console.log('INDEX CALLED', arguments);
        let Players = Backbone.Collection.extend({
            url: window.location.href
        });
        var collection = new Players();
        collection.fetch();

        let view = new PlayersView({collection: collection});
        this.container.show(view);
    }
});