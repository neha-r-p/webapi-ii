const express = require("express");

const server = express();
//teach server to parse json
server.use(express.json());

const db = require("./data/db");
// find, findById, insert,update,remove,findPostComments,findCommentById,insertComment


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

server.post('/api/posts', (req, res) => {
    const postInfo = req.body;
    console.log('post info from body', postInfo)

    db.insert(postInfo)
    .then()
    .catch(err => {
        res.status(500).json({ message: "error adding the blog post" })
    })
})


/*//create a Hub
server.post("/hubs", (req, res) => {
  // http message is an object with headers and body like { headers: {}, body: {//data sent by client} }
  const hubInformation = req.body;
  console.log("hub info from body", hubInformation);

  Hubs.add(hubInformation)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      res.status(500).json({ message: "error adding the hub" });
    });
}); */


const port = 6666;
server.listen(port, () => console.log(`\napi running on port ${port}\n`));
