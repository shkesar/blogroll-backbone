Blogs = Backbone.Collection.extend({
    model: Blog,
    initialize: function () {},
    bindEvents: function () {
        this.on("add", function (model) {
        });
        this.on("remove", function (model) {
        });
        this.on("change", function (model) {
        });
    },
});
