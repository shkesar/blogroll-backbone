$(document).ready(function () {
    var blogsView = new BlogsView({el: "#main"});

    var blog1 = new Blog({
        name: "Michael",
        title: "Michael's Awesome blog",
        link: "http://awesomeblog.com",
    });
    var blog2 = new Blog({
        name: "Lilly",
        title: "Lilly's Flower blog",
        link: "http://flowersforlove.com",
    });

    var blogs = new Blogs([blog1, blog2]);
    var blogView = new BlogView({el: "#blogs"});

    function addBlog(blog) {
        blogs.add(blog);
    }
    function removeBlog(blog) {
        blogs.remove(blog);
    }
    function updateBlog(blog) {
    }
});
