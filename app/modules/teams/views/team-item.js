import Radio from 'backbone.radio';
import Marionette from 'backbone.marionette';
import template from '../templates/team-item.pug';
import moment from 'moment';

export default Marionette.View.extend({

    className: 'team-item col-md-4 col-sm-6',

    template: template,

    events: {
        'click': 'followLink'
    },

    templateContext: {
        formatDate: function(value) {
            return moment(value).format('ll');
        }
    },

    followLink(e) {
        e.preventDefault();
        Radio.channel('navigate').trigger('link:internal', this.model.link('self').href);
    }
});