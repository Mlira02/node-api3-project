const express = require('express');
const postsDb = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  postsDb.get(req.query)
    .then(thing => {
      res.status(200).json(thing);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "There was an error retreiving posts..." })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  postsDb.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Post has been deleted" })
      } else {
        res.status(404).json({ message: "Message could not be found..." })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error handling request..." })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  postsDb.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "there was an error with the request..." })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  postsDb.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "Could not find ID..." });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "There was an error with request" })
    })
};

module.exports = router;