import Marionette from 'backbone.marionette';
import template from '../templates/team.pug';
import moment from 'moment';

export default Marionette.View.extend({

    template: template,

    templateContext: {
        formatDate: function(value) {
            return moment(value).format('ll');
        }
    },
});