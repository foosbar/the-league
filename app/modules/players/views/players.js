import Marionette from 'backbone.marionette';
import PlayerItem from './player-item';

export default Marionette.CollectionView.extend({
    tagName: 'ul',

    className: 'nav nav-pills',

    childView: PlayerItem
});