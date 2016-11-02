import _ from 'underscore';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import IndexView from './index/views/index';

export default Marionette.Application.extend({
    region: '#app',

    initialize() {
        this.layout = new IndexView();
        this.on('start', () => {
            this.showView(this.layout);
            this.startHistory();
        });
    },

    startHistory() {
        function currentRoute() {
            return (_.isEmpty(Backbone.history.fragment)) ? null : Backbone.history.fragment;
        }

        if (Backbone.history) {
            Backbone.history.start({
                pushState: true,
                root: '/'
            });
            Backbone.history.navigate(currentRoute(), {trigger: true});
        }
    }
});