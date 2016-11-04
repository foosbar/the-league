import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import PlayerView from './views/player';
import PlayersLayout from './views/players-layout';

export default Marionette.Object.extend({

    initialize(options) {
        this.container = options.container;
    },

    index() {
        let Players = Backbone.Collection.extend({
            url: window.location.href
        });

        let players = new Players();
        players.fetch();

        this.container.show(new PlayersLayout({collection: players}));
    },

    viewPlayer(playerId) {
        let Player = Backbone.Model.extend({
            url: window.location.href
        });

        let player = new Player();
        player.fetch();

        this.container.show(new PlayerView({model: player}));
    }
});