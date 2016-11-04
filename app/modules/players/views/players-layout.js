import Marionette from 'backbone.marionette';
import PlayersTable from './players';
import Layout from '../templates/players-layout.pug';

export default Marionette.View.extend({

    template: Layout,

    ui: {
        '$createUserBtn': '.btn-create-user'
    },

    events: {
        'click @ui.$createUserBtn': 'createUserModal'
    },

    regions: {
        'table': '.players-table'
    },

    createUserModal() {
        console.log('createusermodal');
    },

    onRender() {
        this.getRegion('table').show(new PlayersTable({
            collection: this.collection
        }));
    }
});