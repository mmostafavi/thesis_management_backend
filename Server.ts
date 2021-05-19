import express from 'express'
const app = express()
import { connectToDatabase } from './model/connect'
import routers from './routes/index'

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
  }

  private connectToDatabase = () => {
    connectToDatabase()
  }

  private initializeRouting = () => {
    Object.values(routers).forEach((router) => app.use(router))
  }
}
