import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from '../templates/index.pug';
import TeamsView from './teams';

export default Marionette.View.extend({
    className: 'container',

    template: template,

    regions: {
        teamTable: '.index-table'
    },

    onRender() {
        let Teams = Backbone.Collection.extend({
            url: window.location.href
        });

        let collection = new Teams();
        let view = new TeamsView({collection: collection});
        this.getRegion('teamTable').show(view);

        collection.fetch();

    }
});