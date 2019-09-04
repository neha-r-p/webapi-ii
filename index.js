const express = require("express");

const server = express();
//teach server to parse json
server.use(express.json());

const Posts = require("./data/db");
// find, findById, insert,update,remove,findPostComments,findCommentById,insertComment

//get all posts
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

//get posts by ID
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

//get comments on specific post using id
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

//post new blog post
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


//post new comment (NOT COMPLETE)
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

//Delete a post by using id
server.delete("/api/posts/:id", (req, res) => {
  const postId = req.params.id;

  Posts.remove(postId)
    .then(post => {
      res
        .status(200)
        .json({ message: "Successfully deleted the blog post." });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "The post could not be removed." });
    });
});

// update a post with PUT request
server.put('/api/posts/:id', (req, res) => {
    const changes = req.body;
    const postId = req.params.id;
    Posts.update(postId, changes)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch()
})


// server.put('/api/hubs/:id', (req, res) => {
//     const changes = req.body;
//     Hubs.update(req.params.id, changes)
//     .then(hub => {
//       if (hub) {
//         res.status(200).json(hub);
//       } else {
//         res.status(404).json({ message: 'The hub could not be found' });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error updating the hub',
//       });
//     });
//   });

const port = 6666;
server.listen(port, () => console.log(`\napi running on port ${port}\n`));
