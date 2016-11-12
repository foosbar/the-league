import Marionette from 'backbone.marionette';
import CreateForm from './views/create';
import IndexView from './views/index';
import TeamView from './views/team';
import Team from './models/team';

export default Marionette.Object.extend({

    initialize(options) {
        this.container = options.container;
    },

    createForm() {
        let team = new Team();
        this.container.show(new CreateForm({model: team}));
    },

    index() {
        this.container.show(new IndexView());
    },

    viewTeam() {
        let team = new Team();
        team.url = window.location.pathname;

        this.container.show(new TeamView({model: team}));

        team.fetch();
    }
});