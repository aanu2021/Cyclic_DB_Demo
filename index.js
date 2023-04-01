require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/model');


app.use(bodyParser.urlencoded({extended : true}));
const staticPath = path.join(__dirname,"public");
app.use(express.static(staticPath));

const port = process.env.PORT || 3000;
mongoose.set('strictQuery',false);
const connectDB = async()=>{
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`MongoDB connected at ${conn.connection.host}`); 
    }catch(err){
       console.log(err);
       process.exit(1); 
    }
}

app.get('/',(req,res)=>{
    res.send(path.join(__dirname,"public/index.html"));
})

app.post('/add',async(req,res)=>{
    try{
        const _name = req.body.name;
        const _author = req.body.author;
        const _price = req.body.price;
        const _avail = req.body.avail;
        const book = new Book({
            name : _name,
            author : _author,
            price : _price,
            avail : _avail
        });
        // console.log(book.name);
        await book.save();
        res.send("<h1>Information Added Successfully....</h1>");
    }catch(err){
        console.log(err);
    }
})

app.get('/books',async(req,res)=>{
    try{
        const bookInfo = await Book.find();
        res.send(bookInfo);
    }catch(err){
        console.log(err);
    }
})


connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("Server is listening at port no " ,port);
    })
})