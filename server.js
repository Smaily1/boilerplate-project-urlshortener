require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validUrl = require('valid-url');


// Basic Configuration
const port = 3000;

// mongoose.connect( process.env.DB_URI , {useNewUrlParser: true, useUnifiedTopology: true}, () =>
// console.log("connected")); 

mongoose.connect("mongodb+srv://admin:12345@cluster0.ldvwh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(()=>{
  console.log('database connected.')
}).catch((err) => console.log(err.message))


// console.log(mongoose.connection.readyState)
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// app.urlencoded()


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


var urlSchema = new mongoose.Schema({
  oldURL: String,
  id: Number,
  newURL: String
});

var URI = mongoose.model("URI", urlSchema);


// Posting new short URL

app.post('/api/shorturl',async (req,res)=>{
const url = req.body.url


if (validUrl.isUri(url)){

var verify = await URI.findOne({ oldURL: url })

if(url === verify) {
  
res.json({"original_url": url ,"short_url": num});;

}

var num = Math.floor(Math.random() * 500000);

console.log(num)

const dbUrl = new URI({
  oldURL: url,
  newURL: num
});

dbUrl.save();


res.json({"original_url": url ,"short_url": num});;
} 
else {
res.json({"error":"Invalid URL"});
}

} )

// Redirecting to the long URL

app.get('/api/shorturl/:short',async function(req,res){
var short = req.params.short

var userR = await URI.findOne({ newURL: short })
if(userR == null) return res.sendStatus(404);

res.redirect(userR.oldURL)

});
