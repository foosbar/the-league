import Marionette from 'backbone.marionette';
import template from '../templates/index.pug';
import TopNav from './topnav';
import Footer from './footer';

export default Marionette.View.extend({

    template: template,

    regions: {
        topnav: 'nav#topnav',
        content: '#content',
        footer: 'footer#footer'
    },

    onRender() {
        this.getRegion('topnav').show(new TopNav());
        this.getRegion('footer').show(new Footer());
    }
});