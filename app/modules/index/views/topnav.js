import Marionette from 'backbone.marionette';
import template from '../templates/topnav.pug';
import Links from '../models/links';
import LinksView from './links';

export default Marionette.View.extend({

    className: 'container',

    template: template,

    regions: {
        links: '#topnav-links'
    },

    onRender() {
        this.showLinks();

    },

    showLinks() {
        let links = new Links();
        let linksView = new LinksView({collection: links});
        links.fetch();

        // Show the linksView
        this.getRegion('links').show(linksView);
    }

});