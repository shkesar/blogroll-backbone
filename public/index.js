Backbone.Model.prototype.idAttribute = '_id';

Blog = Backbone.Model.extend({
    defaults: {
        author: "",
        title: "",
        link: "",
    },
    idAttribute: '_id',
    initialize: function () {},
    url: "http://localhost:3000/api/blogs",
});

// var blog1 = new Blog({
//     author: "Michael",
//     title: "Michael's Awesome blog",
//     link: "http://awesomeblog.com",
// });
// var blog2 = new Blog({
//     author: "Lilly",
//     title: "Lilly's Flower blog",
//     link: "http://flowersforlove.com",
// });

Blogs = Backbone.Collection.extend({
    model: Blog,
    initialize: function () {},
    idAttribute: 'user_ID',
    url: "http://localhost:3000/api/blogs",
});

var blogs = new Blogs();

BlogView = Backbone.View.extend({
    tagName: 'tr',
    model: new Blog(),
    initialize: function () {
        this.template = _.template($('#blog-template').html());
    },
    events: {
        "click .edit-blog": "edit",
        "click .remove-blog": "destroy",
        "click .update-blog": "update",
        "click .cancel-blog": "cancel",
    },
    edit: function () {
        this.$(".edit-blog").hide();
        this.$(".remove-blog").hide();
        this.$(".update-blog").show();
        this.$(".cancel-blog").show();

        var author = this.$(".author").html();
        var title = this.$(".title").html();
        var link = this.$(".link").html();

        this.$(".author").html('<input type="input" class="input-author" value="' + author + '"/>');
        this.$(".title").html('<input type="input" class="input-title" value="' + title + '"/>');
        this.$(".link").html('<input type="input" class="input-link" value="' + link + '"/>');
    },
    destroy: function () {
        this.model.destroy({
            success: function (response) {
                console.log("Successfully deleted blog", response.toJSON()._id);
            },
            error: function (err) {
                console.log("Can't delete blog", err);
            }
        });
    },
    update: function () {
        this.model.set('author', this.$('.input-author').val());
        this.model.set('title', this.$('.input-title').val());
        this.model.set('link', this.$('.input-link').val());

        this.model.save({
            success: function () {
                console.log("Updated blog");
            },
            error: function (err) {
                console.log("Error updating", err);
            }
        });
        this.render();
    },
    cancel: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

BlogsView = Backbone.View.extend({
    model: blogs,
    initialize: function () {
        this.model.on('add', this.render, this);
        this.model.on('remove', this.render, this);

        this.model.fetch({
            success: function (response) {
                _.each(response.toJSON(), function (item) {
                    console.log("Got blog with id", item._id);
                });
            },
            error: function () {
                console.log("Failed to get blogs");
            }
        });
    },
    render: function () {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function (blog) {
            self.$el.append((new BlogView({model: blog})).render().$el);
        });
        return this;
    }
});

var blogsView = new BlogsView({el: $('#blogs')});
blogsView.render();

$(document).ready(function () {
    $('#add-blog').on('click', function () {
        var blog = new Blog({
            author: $("#input-author").val(),
            title: $("#input-title").val(),
            link: $('#input-link').val(),
        });
        $("#input-author").val('');
        $("#input-title").val('');
        $("#input-link").val('');

        blog.save({
            success: function () {
                console.log("Successfully saved blog");
                blogs.add(blog);
            },
            error: function (err) {
                console.log("Error saving blog", err);
            }
        })
    });
});
