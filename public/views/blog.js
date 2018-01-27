BlogView = Backbone.View.extend({
    defaults: {
        blog: new Blog(),
    },
    elementName: 'td',
    className: 'row',
    id: 0,
    initialize: function () {
        this.render();
    },
    render: function () {
        var template = _.template($("#blogs-template").html(), model.toJSON());
        this.$el.append(template);
    },
});
