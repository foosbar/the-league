import Marionette from 'backbone.marionette';
import moment from 'moment';

export default Marionette.View.extend({
    templateContext: {
        formatDate: function(value) {
            return moment(value).format('ll');
        }
    },
});