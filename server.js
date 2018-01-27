var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/blogroll");
var BlogSchema = Schema({
    author: String,
    title: String,
    link: String,
});
mongoose.model('Blog', BlogSchema);

var Blog = mongoose.model('Blog');

var blog = new Blog({
    author: "Shubham",
    title: "My first blog",
    link: "http://blog.com",
});
// blog.save();

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/api/blogs', function (req, res) {
    console.log("Received a GET request");
    Blog.find(function (err, docs) {
        res.send(docs);
    });
});
app.post('/api/blogs', function (req, res) {
    console.log("Received a POST request");
    var blog = new Blog(req.body);
    blog.save(function (err, doc) {
        res.send(doc);
    });
});
app.delete('/api/blogs/:id', function (req, res) {
    console.log("Received a DELETE request", req);
    Blog.remove({_id: req.params.id}, function (err) {
        res.send({_id: req.params.id});
    });
});
app.put('/api/blogs/:id', function (req, res) {
    console.log("Received a UPDATE request", req.params.id);
    Blog.update({_id: req.params.id}, req.body, function (err) {
        res.send({_id: req.params.id});
    });
});

var port = 3000;

app.listen(port);
console.log("Server running on port", port);
