require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validUrl = require('valid-url');


// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect( process.env.DB_URI , {useNewUrlParser: true, useUnifiedTopology: true}, () =>
console.log("connected")); 

console.log(mongoose.connection.readyState)
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

// const schema = new mongoose.Schema({ name: 'string', id: inrger });
// const Tank = mongoose.model('Tank', schema);

// const Schema = mongoose.Schema
// const URLSchema = new Schema({
// oldURL : String,
// id : Number
// })

// const Model = mongoose.model
// const URL = Model('Urls',URLSchema)

// const NodeJsGuide = new URL({name : 'Googl.com' })



app.post('/api/shorturl', (req,res)=>{
  const url = req.body.url

  console.log(url)

  if (validUrl.isUri(url)){

              
      const urlSchema = new mongoose.Schema({
        oldURL: String,
        id: Number,
        newURL: String
      });

      const URI = mongoose.model("URI", urlSchema);

      const dbUrl = new URI({
        oldURL: url,
        id: 1,
        newURL: "12345"
      });

      dbUrl.save();


    res.json({"original_url": url ,"short_url": "id"});;
} 
else {
    res.json({"error":"Invalid URL"});
}
  
} )
