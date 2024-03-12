const express = require("express");
const app = express();
require('dotenv').config()
const {connectDB} = require('./db/index.js')
const authRouter = require('./routers/authRtrs.js')
const postRouter = require('./routers/postRouter.js')
const morgon = require('morgan');

connectDB();

//middleware
app.use(express.json());
app.use(morgon('common'))

app.use('/auth',authRouter);
app.use('/postAPI',postRouter)
app.get('/',(req,res)=>{
    res.status(200).send("ok from server");
})


app.listen(process.env.PORT || 4001,()=>{
    console.log("Server is Lestening on PORT" ,process.env.PORT);
})