const server = require('./server');
const port = process.env.PORT || 4000;
server.listen(4000, () => {
    console.log(`\n* Server Running on http://localhost:${port} *\n`);
});