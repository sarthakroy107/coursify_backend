const express = require('express');
const app = express();
const db = require('./config/database');
const cookieParser = require('cookie-parser');

db.connect();


app.use(express.json());
app.use(cookieParser());

const userRoutes = require('./routes/UserRoute')
app.use('/api/v1', userRoutes);

app.get('/', (req, res)=>{
    return res.status(200).json({
        sucess: true,
        message: "Server is up and running"
    })
})


app.listen(4000, ()=>{
    console.log('server is running')
})