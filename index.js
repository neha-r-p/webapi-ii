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
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved." });
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
  const postId = req.params.id;

  Posts.findPostComments(postId)
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      res.status(500).json({ message: "Comments for blog post not found" });
    });
});

server.post(`/api/posts`, (req, res) => {
  const { title, contents } = req.body;

  if (title && contents) {
    Posts.insert({ title, contents })
      .then(({ id }) => {
        Posts.findById(id)
          .then(post => {
            res.status(201).json(post[0]); // return HTTP status code 201 & newly created post
          })
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .json({ error: "There was a server error retrieving the post" });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res
      .status(400)
      .json({ error: "Please provide title and contents for the post." });
  }
});

server.post("api/posts/:id/comments", (req, res) => {
  const postInfo = req.body;
  const postId = req.params.id;
  console.log("post info from body", postInfo);

  Posts.insertComment(postInfo)
    .then(comment => {
      if (postInfo.text) {
        res.status(201).json(postInfo);
      } else {
        res
          .status(400)
          .json({ message: "Please provide title and contents for the post." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error adding the blog post" });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const postId = req.params.id;

  Posts.remove(postId)
    .then(post => {
      res
        .status(200)
        .json({ message: "The post with the specified ID does not exist." });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "The post could not be removed." });
    });
});

const port = 6666;
server.listen(port, () => console.log(`\napi running on port ${port}\n`));
