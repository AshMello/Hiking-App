const express = require('express')
const app = express()
const cors = require('cors')
const models = require('./models')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const PORT = 8080
const bcrypt = require('bcrypt')
const saltRounds = 10

app.use(bodyParser.json())
app.use(cors())

app.get('/api/coordinates', (req,res) => {
    models.Location.findAll().then(records => {
        res.json(records)
    })
})

function authenticate(req,res, next) {
    let headers = req.headers["authorization"]

    let token = headers.split(' ')[1]

    jwt.verify(token,'secret',(err, decoded) => {
        if(decoded) {
            if(decoded.username) {
                next()
            } else {
                res.status(401).json({message: 'Token invalid'})
            }
        } else {
            res.status(401).json({message: 'Token invalid'})
        }
    })
}

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
        // newUser.save()
        // .then((newRecord) => {
        //     res.json({message: 'user saved success!'})
        // }).catch(error => res.json({message: 'fail'}))
             })
    
        }
      })
    })
})



app.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    models.User.findAll({
        where: {
            username: username,
            password: password
        }
    })
    .then((user) => {
        if(user) {

            jwt.sign({ username: username}, 'secret', function(err, token) {
                if (token) {
                    res.json({token: token})
                } else {
                    res.status(500).json({message: 'unable to generate token'})
                }
            })
        }
    })
})

app.post('/api/coordinates', (req,res) => { 

    let latitude = req.body.latitude
    let longitude = req.body.longitude

    let positionRecord = models.Location.build({
        latitude: latitude,
        longitude: longitude
    })

    positionRecord.save()
    .then((newRecord) => {
        res.json({message: 'record saved success!'})
    }).catch(error => res.json({message: 'fail'}))

})



app.listen(PORT, () => {
    console.log('Server')
})