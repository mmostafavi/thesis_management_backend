import express from 'express'
const app = express()
import routers from './routes/index'
import connectToDatabase from './model/connect'
import dotenv from 'dotenv'
dotenv.config()

interface ServerI {
  start(): void
}

export default class Server {
  constructor() {
    this.initializeServer()
    this.initializeRouting()
  }

  public start() {
    this.connectToDatabase()
  }

  private initializeServer = () => {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.listen(process.env.PORT)
    console.log(`server is listening in Port: ${process.env.PORT}`)
  }

  private connectToDatabase = () => {
    connectToDatabase()
  }

  private initializeRouting = () => {
    Object.values(routers).forEach((router) => {
      app.use(router)
    })
    app.use(function (req, res, next) {
      res.status(404).send('Unable to find the requested resource!')
    })
  }
}

const server = new Server()
server.start()
