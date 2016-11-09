import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import PlayersTable from './players';
import Layout from '../templates/players-layout.pug';

export default Marionette.View.extend({

    template: Layout,

    ui: {
        '$createUserBtn': '.btn-create-user'
    },

    events: {
        'click @ui.$createUserBtn': 'createPlayerForm'
    },

    regions: {
        'table': '.players-table'
    },

    createPlayerForm() {
        Backbone.history.navigate('/players/create', {trigger: true});
    },

    onRender() {
        this.getRegion('table').show(new PlayersTable({
            collection: this.collection
        }));
    }
});