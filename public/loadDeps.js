// Javascript code to differentiate between PROD and DEV dependencies

function getDependencies (isProduction) {
    // Don't disturb the order of the dependencies
    if (isProduction) {
        return [
            {path: "node_modules/jquery/dist/jquery.min.js", async: false},
            {path: "node_modules/underscore/underscore-min.js", async: true},
            {path: "node_modules/backbone/backbone-min.js", async: false},
            {path: "models/blog.js", async: false},
            {path: "models/blogs.js", async: false},
            {path: "views/blog.js", async: false},
            {path: "views/blogs.js", async: false},
            {path: "main.js", async: false},
        ];
    } else {
        return [
            {path: "node_modules/jquery/dist/jquery.js", async: false},
            {path: "node_modules/underscore/underscore.js", async: true},
            {path: "node_modules/backbone/backbone.js", async: false},
            {path: "models/blog.js", async: false},
            {path: "models/blogs.js", async: false},
            {path: "views/blog.js", async: false},
            {path: "views/blogs.js", async: false},
            {path: "main.js", async: false},
        ];
    }
}

function generateScriptTags (dependencies) {
    var scriptTags = [];
    dependencies.forEach(function (dependency) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = dependency.path;
        script.async = dependency.async;
        scriptTags.push(script);
    });
    return scriptTags;
}

function addTags (tags, container) {
    tags.forEach(function (tag) {
        container.appendChild(tag);
    });
}

var isProduction = false;
var dependencies = getDependencies(isProduction);
var scriptTags = generateScriptTags(dependencies);
var head = document.getElementsByTagName('head')[0];
addTags(scriptTags, head);
