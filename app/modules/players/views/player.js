import Marionette from 'backbone.marionette';
import Layout from '../templates/player-layout.pug';

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