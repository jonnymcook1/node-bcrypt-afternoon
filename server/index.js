require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authController = require('./controllers/authController')

const app = express()

const{SESSION_SECRET, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
})

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)

app.post('/auth/register', authController.register)

const port = 5050

app.use(express.json())

app.listen(port, () => (
    console.log(`listening on port ${port}`)
))