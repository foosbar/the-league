import Marionette from 'backbone.marionette';
import IndexLayout from './views/index';

export default Marionette.Object.extend({

    initialize(options) {
        this.container = options.container;
    },

    index() {
        this.container.show(new IndexLayout());
    },
});