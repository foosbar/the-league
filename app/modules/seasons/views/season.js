import Marionette from 'backbone.marionette';
import Layout from '../templates/season-layout.pug';

export default Marionette.View.extend({
    template: Layout


    /*
    onRender() {
        this.showChildView('tbody', new TableBody({
            collection: this.collection
        }));
    }
    */
});