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
      res.status(500).json({ message: "error getting the list of posts" });
    });
});

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

server.delete("api/posts/:id", (req, res) => {
  const postId = req.params.id;

  res.status(200).json({
    url: `api/posts/${postId}`,
    opeation: `DELETE for hobbit with id ${postId}`,
  });
  
});

const port = 6666;
server.listen(port, () => console.log(`\napi running on port ${port}\n`));
