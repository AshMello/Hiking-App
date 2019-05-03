const express = require('express')
const app = express()
const cors = require('cors')
const models = require('./models')
const bodyParser = require('body-parser')
const PORT = 8080

app.use(bodyParser.json())
app.use(cors())

app.get('/api/coordinates', (req,res) => {
    models.Location.findAll().then(records => {
        res.json(records)
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