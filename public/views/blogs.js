BlogsView = Backbone.View.extend({
    defaults: {
        blogs: new Blogs(),
    },
    initialize: function () {
        this.render();
    },
    render: function () {
        var template = _.template($("blogs-template").html(), {});
    }
});
