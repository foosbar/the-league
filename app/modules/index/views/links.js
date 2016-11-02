import Marionette from 'backbone.marionette';
import LinkItem from './link-item';

export default Marionette.CollectionView.extend({
    tagName: 'ul',

    className: 'nav navbar-nav navbar-right',

    childView: LinkItem
});