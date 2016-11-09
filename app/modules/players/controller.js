import Marionette from 'backbone.marionette';
import CreateForm from './views/create';
import PlayerView from './views/player';
import PlayersLayout from './views/players-layout';
import Player from './models/player';
import Players from './models/players';

export default Marionette.Object.extend({

    initialize(options) {
        this.container = options.container;
    },

    createForm() {
        console.log('CREATE FORM!!!!!');
        let player = new Player();
        this.container.show(new CreateForm({model: player}));
    },

    index() {
        let players = new Players();
        players.url = window.location.href;

        players.fetch();

        this.container.show(new PlayersLayout({collection: players}));
    },

    viewPlayer(playerId) {
        let player = new Player();
        player.url = window.location.href;
        player.fetch();

        this.container.show(new PlayerView({model: player}));
    }
});