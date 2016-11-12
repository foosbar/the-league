import Backbone from 'backbone';
import _ from 'underscore';

export default Backbone.Model.extend({

    link(rel) {
        const links = this.get('_links');
        if(_.isArray(links)) {
            return _.findWhere(links, {'rel': rel});
        }
    }

});