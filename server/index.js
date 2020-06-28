require('dotenv').config()

const express = require('express');
const cors = require('cors');
const assert = require('assert')

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
  var item = {
    username: req.body.username,
    password: req.body.password
  }
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(process.env.MONGO_URI, function (err, mongoClient){
    const dbName = process.env.MONGO_URI.split('/').pop().split('?').shift()
    const db = mongoClient.db(dbName)
     db.collection('lifters').findOne(item)
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

app.post('/signup',(req,res)=>{
  //make a seperate method to check the existence of the email
  console.log(process.env.MONGO_URI)
  console.log(req.body.username)
  console.log(req.body.password)
  var item = {
    username: req.body.username,
    password: req.body.password
  }
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect(process.env.MONGO_URI, function (err, mongoClient){
    const dbName = process.env.MONGO_URI.split('/').pop().split('?').shift()
    const db = mongoClient.db(dbName)
     db.collection('lifters').findOne(item)
     .then(userFound => {
       if(!userFound){
         console.log('username available')
         db.collection('lifters').insertOne(item, function(err, result){
          assert.equal(null, err)
          console.log('item inserted')
          mongoClient.close()
        })
         res.json({
             success: 'yes'
         })
       } else {
         console.log('user already exists')
         res.json({
             success: 'taken'
         })
       }
       }
     )
   })
});

app.listen(5000, () => {
  console.log('listening on http://localhost:5000')
})
