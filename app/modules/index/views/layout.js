import Marionette from 'backbone.marionette';
import template from '../templates/layout.pug';
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
        this.showChildView('topnav', new TopNav());
        this.showChildView('footer', new Footer());
    }
});