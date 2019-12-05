const express = require('express');
const userDb = require('./userDb');
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error with request..." })
    })
});

router.post('/:id/posts', validatePost, (req, res) => {
  userDb.insert(req.body)
    .then(post => {
      res.status(201).json({ post })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "there was an error adding user..." })
    })
});

router.get('/', (req, res) => {
  userDb.get(req.query)
    .then(thing => {
      res.status(200).json(thing)
    })
    .catch(err => {
      console.log(`There was an error: ${err}`);
      res.status(500).json({ message: "Error grabbing the users..." })
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "user has been deleted" })
      } else {
        res.status(404).json({ message: "user could not be found..." })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error handling request..." })
    })
});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
  userDb.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Could not find matching ID..." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "there was an error with the request..." })
    })
};

function validateUser(req, res, next) {
  if (!Object.getOwnPropertyNames(req.body).length) {
    console.log(req.body.name);
    res.status(400).json({ message: "missing user data" })
  }
  else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  }
  else {
    next();
  }
};

function validatePost(req, res, next) {
  if (!Object.getOwnPropertyNames(req.body).length) {
    res.status(400).json({ message: "missing post data..." })
  } else if (!req.body.user) {
    res.status(400).json({ message: "missing required text field..." })
  } else {
    next();
  }
};

module.exports = router;
