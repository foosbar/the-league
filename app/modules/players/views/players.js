import Marionette from 'backbone.marionette';
import RowTemplate from '../templates/player-row.pug';
import TableTemplate from '../templates/player-table.pug';

const RowView = Marionette.View.extend({
    tagName: 'tr',
    template: RowTemplate,
});

const TableBody = Marionette.CollectionView.extend({
    tagName: 'tbody',
    childView: RowView
});

export default Marionette.View.extend({
    tagName: 'table',
    className: 'table table-hover',
    template: TableTemplate,

    regions: {
        tbody: {
            el: 'tbody',
            replaceElement: true
        }
    },

    onRender() {
        this.showChildView('tbody', new TableBody({
            collection: this.collection
        }));
    }
});