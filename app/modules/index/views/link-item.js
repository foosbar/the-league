import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Marionette from 'backbone.marionette';
import template from '../templates/link-item.pug';
import urlapi from 'url';

export default Marionette.View.extend({
    tagName: 'li',

    template: template,

    events: {
        'click a': 'followLink'
    },

    initialize(options) {
        Marionette.View.prototype.initialize.apply(this, arguments);

        /**
         * Listen for link highlighting
         */
        this.listenTo(Radio.channel('topnav'), 'highlight:link', (linkName) => {
            this.$el.toggleClass('active', this.model.get('rel') === linkName);
        });
    },

    followLink(e) {
        e.preventDefault();
        e.stopPropagation();

        var url = urlapi.parse(this.model.get('href'));
        Backbone.history.navigate(url.pathname + (url.search || ''), {trigger: true});
    }
});