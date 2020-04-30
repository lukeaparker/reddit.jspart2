const Post = require("../models/post");
const User = require("../models/user");

module.exports = (app) => {
  app.get("/posts/new", (req, res) => {
    let currentUser = req.user;
    Post.find({}).populate("author")
        .then(posts => {
            posts = JSON.parse(JSON.stringify(posts))
            res.render("posts-new", { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });

// CREATE
app.post("/posts/new", (req, res) => {
  if (req.user) {
    var post = new Post(req.body);

    post.save(function(err, post) {
      return res.redirect(`/`);
    });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
});
  })

  // INDEX
  app.get("/", (req, res) => {
    let currentUser = req.user;
    Post.find({}).populate("author")
        .then(posts => {
            posts = JSON.parse(JSON.stringify(posts))
            res.render("posts-index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
});

  // GET SINGLE POST
  app.get('/posts/:id', function (req, res) {
    // LOOK UP THE POST
    let currentUser = req.user;
    Post.findById(req.params.id).lean().populate('comments').then((post) => {
      res.render('post-show', { post, currentUser })
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // SUBREDDIT
  app.get('/n/:subreddit', function (req, res) {
    let currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render('posts-index', { posts, currentUser })
      })
      .catch(err => {
        console.log(err)
      })
  })
}