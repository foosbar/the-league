import urlapi from 'url';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import LayoutView from './index/views/layout';
import Radio from 'backbone.radio';

export default Marionette.Application.extend({
    region: '#app',

    initialize() {
        this.layout = new LayoutView();
        this.on('start', () => {
            this.showView(this.layout);
            this.startHistory();
        });

        Radio.channel('navigate').on('link:internal', function(href) {
            var url = urlapi.parse(href);
            Backbone.history.navigate(url.pathname + (url.search || ''), {trigger: true});
        });

        /**
         * Listens for all clicks and if they are anchor links
         * we prevent default and follow the link.
         */
        $('body').on('click', (e) => {
            var target = $(e.target);
            if (target.is('a[href]') ) {
                e.preventDefault();
                Radio.channel('navigate').trigger('link:internal', target.attr('href'));
            }
        });
    },

    startHistory() {
        if (Backbone.history) {
            Backbone.history.start({
                pushState: true,
                root: '/',
                silent: false
            });
        }
    }
});