import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import template from '../templates/index.pug';
import TeamsView from './teams';
import Teams from '../models/teams';

export default Marionette.View.extend({

    template: template,

    regions: {
        teamTable: '.index-table'
    },

    ui: {
        '$createTeamBtn': '.btn-create-team'
    },

    events: {
        'click @ui.$createTeamBtn': 'createTeamForm'
    },

    createTeamForm() {
        Backbone.history.navigate('/teams/create', {trigger: true});
    },

    onRender() {

        let teams = new Teams();
        teams.url = window.location.href;

        let view = new TeamsView({collection: teams});
        this.getRegion('teamTable').show(view);

        teams.fetch();

    }
});