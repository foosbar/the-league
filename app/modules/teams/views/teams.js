import Marionette from 'backbone.marionette';
import TeamItem from './team-item';

export default Marionette.CollectionView.extend({
    className: 'team-list row',

    childView: TeamItem
});