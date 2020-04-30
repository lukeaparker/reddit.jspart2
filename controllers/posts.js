
const Post = require('../models/post')

module.exports = (app) => {
  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body)

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      if (err) {
        console.log(err.stack)
      }
      // REDIRECT TO THE ROOT
      return res.redirect('/')
    })
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