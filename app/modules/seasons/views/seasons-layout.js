import Marionette from 'backbone.marionette';
import SeasonsTable from './seasons-table';
import Layout from '../templates/seasons-layout.pug';

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
        this.getRegion('table').show(new SeasonsTable({
            collection: this.collection
        }));
    }
});