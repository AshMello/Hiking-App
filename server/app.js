const express = require('express')
const app = express()
const cors = require('cors')
const models = require('./models')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const PORT = 8080
const bcrypt = require('bcrypt')
const saltRounds = 10
const sid = "ACda4049a8a2659a0be822a4cbbe843481"
const token = "48cade4f7097fe48367e2d0b1eea7fff"
const client = require('twilio')(sid, token);

app.use(cors())
app.use(bodyParser.json())


app.post('/register', (req,res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err,hash) {

    let username = req.body.username
    let password = hash

    let newUser = models.User.build({
        username: username,
        password: password
    })
    models.User.findOne({
        where: {username : req.body.username}
      }).then(function (result) {
            if (null != result) {
              console.log("USERNAME ALREADY EXISTS:", result.username);
            }
            else {
              newUser.save().then(function(newUser){
             })
        }
      })
    })
})

app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    models.User.findOne({
        where: {
            username: username
        }
    })
    .then((user) => {

        bcrypt.compare(password, user.password).then(function(result) {
          if(result) {
            jwt.sign({name: user.name}, 'secret', function(err, token) {
              if(token) {
              res.json({token: token, id: user.dataValues.id})
              } else {
                res.status(500).json({message: 'Unable to generate token'})
               }
             })
           }
        })
      })
})

app.get('/api/coordinates', (req,res) => {
    models.Location.findAll().then(records => {
        res.json(records)
    })
})


app.post('/api/coordinates', (req,res) => { 

    let latitude = req.body.latitude
    let longitude = req.body.longitude
    let userId = req.body.userId

    let positionRecord = models.Location.build({
        latitude: latitude,
        longitude: longitude,
        userId: userId
    })

    positionRecord.save()
    .then((newRecord) => {
        res.json({message: 'record saved success!'})
        console.log(newRecord)
    }).catch(error => res.json({message: 'fail'}))

})


app.post('/delete', (req, res) => {
    models.Location.destroy({
        where: {
            id: req.body.locationId
        }
    })
})

app.post('/sendsms', (req, res) => {

    const latitude = req.body.data.latitude
    const longitude = req.body.data.longitude
    const messages = req.body.messages

    console.log(req.body.data)

    client.messages.create({
      to: req.body.data.phone,
      from: '+18304200813',
      body: `${req.body.data.messages} https://www.latlong.net/c/?lat=${latitude}&long=${longitude}`
    }).then(message => console.log(message.body))
    })

app.get('/sendsms', (req,res) => {
    app.render('/sendsms')
})



app.listen(PORT,() => {
    console.log('Server is running...')
  })
  