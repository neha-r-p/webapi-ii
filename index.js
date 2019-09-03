const express = require("express");

const server = express();
//teach server to parse json
server.use(express.json());

const db = require("./data/db");
// find, findById, insert,update,remove,findPostComments,findCommentById,insertComment



//handle HTTP GET requests to the / URL
server.get("/api/posts", (req, res) => {
    db.find()
    .then(db => {
      // .json will convert (or try) the data passed to JSON before sending
      // also tells the client we're sending JSON through an HTTP header
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "error getting the list of posts" });
    });
});

const port = 6666;
server.listen(port, () => console.log(`\napi running on port ${port}\n`));
