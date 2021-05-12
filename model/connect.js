const mongoose = require('mongoose')
const express = require('express')

const app = express()

mongoose.set('returnOriginal', false)
const connectToDatabase = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PASSWORD}@cluster0.oygyj.mongodb.net/${process.env.DATABASE_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then(() => {
      app.listen(process.env.PORT)
      console.log(`app is listening in port: ${process.env.PORT}`)
    })
    .catch((err) => {
      throw err
    })
}

module.exports = {
  connectToDatabase,
}
