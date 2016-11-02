import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from '../templates/player-item.pug';

export default Marionette.View.extend({
    tagName: 'li',

    template: template,

    events: {
        'click a': 'followLink'
    },

    followLink(e) {
        e.preventDefault();
        e.stopPropagation();
        // Not quite working
        Backbone.history.navigate(this.model.get('href'));
    }
});