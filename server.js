const express = require('express');
const server = express();
const usersRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

//custom middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}
server.use(express.json());
server.use(logger);
server.use('/posts', postRouter);
server.use('/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;
