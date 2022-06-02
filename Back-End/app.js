const express = require('express');

const userRoute = require('./Routers/UserRouter');
const postRouter = require('./Routers/postRouter');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());


// Routers

app.use('/api/Auth',userRoute);

app.use('/api/post',postRouter);


module.exports = app;