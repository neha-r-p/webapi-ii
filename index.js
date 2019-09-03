const express = require("express");

const server = express();
//teach server to parse json
server.use(express.json());

const Posts = require("./data/db");
// find, findById, insert,update,remove,findPostComments,findCommentById,insertComment

server.get("/api/posts", (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting the blog posts" });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  Posts.findById(postId)
    .then(p => {
      if (p) {
        res.status(200).json(p);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting the blog post" });
    });
});

server.get("/api/posts/:id/comments", (req, res) => {
    const postId = req.params.id

    Posts.findPostComments(postId)
    .then(comments => {
        res.status(200).json(comments)
    }

    )
    .catch(err => {
        res.status(500).json({ message: "Comments for blog post not found" })
    })
})

server.post("/api/posts", (req, res) => {
  const postInfo = req.body;
  console.log("post info from body", postInfo);

  Posts.insert(postInfo)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding the blog post" });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const postId = req.params.id;

  Posts.remove(postId)
    .then(post => {
      res.status(200).json({ message: "Blog post deleted successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error deleting blog post" });
    });
});

const port = 6666;
server.listen(port, () => console.log(`\napi running on port ${port}\n`));
