import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from '../templates/team-item.pug';

export default Marionette.View.extend({

    className: 'team-item col-md-4 col-sm-6',

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