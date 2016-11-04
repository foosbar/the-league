import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import BaseView from '../../common/views/base-view';
import RowTemplate from '../templates/seasons-row.pug';
import TableTemplate from '../templates/seasons-table.pug';

const RowView = BaseView.extend({
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