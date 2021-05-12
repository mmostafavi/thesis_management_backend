const express = require('express')

const app = express()

//routing imports
const thesisRouter = require('./routes/Thesis')

// data base imports
const { connectToDatabase } = require('./model/connect.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/*
  you may need to add authentication here
    app.use(student_Auth)
    app.use(instructor_Auth)
  you may need to add authentication here
 */

// routing
app.use(thesisRouter)

//database connection
connectToDatabase()
