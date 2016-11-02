import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from '../templates/link-item.pug';
import urlapi from 'url';

export default Marionette.View.extend({
    tagName: 'li',

    template: template,

    events: {
        'click a': 'followLink'
    },

    followLink(e) {

        var url = urlapi.parse(this.model.get('href'));

        e.preventDefault();
        e.stopPropagation();
        // Not quite working
        Backbone.history.navigate(url.pathname + (url.search || ''), {trigger: true});
    }
});