import Radio from 'backbone.radio';
import Marionette from 'backbone.marionette';
import template from '../templates/link-item.pug';

export default Marionette.View.extend({
    tagName: 'li',

    template: template,

    initialize(options) {
        Marionette.View.prototype.initialize.apply(this, arguments);

        /**
         * Listen for link highlighting
         */
        this.listenTo(Radio.channel('topnav'), 'highlight:link', (linkName) => {
            this.$el.toggleClass('active', this.model.get('rel') === linkName);
        });
    }
});