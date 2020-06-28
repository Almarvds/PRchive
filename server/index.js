require('dotenv').config()

const express = require('express');
const cors = require('cors');

const app = express();

const db = ('localhost/prchive');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
      message:'Fitness server is up'
  })
})

app.post('/login',(req,res)=>{
  //make a seperate method to check the existence of the email
  console.log(process.env.MONGO_URI)
  console.log(req.body.username)
  console.log(req.body.password)
  let query = { user: 'pika' }
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(process.env.MONGO_URI, function (err, mongoClient){
    const dbName = process.env.MONGO_URI.split('/').pop().split('?').shift()
    const db = mongoClient.db(dbName)
     db.collection('lifters').findOne(query)
     .then(userFound => {
       if(!userFound){
         console.log('user not found!')
         res.json({
             legit: false
         })
       } else {
         console.log('user found')
         res.json({
             legit: true
         })
       }
       }
     )
   })
});

app.listen(5000, () => {
  console.log('listening on http://localhost:5000')
})
