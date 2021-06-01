import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.set('returnOriginal', false)
const connectToDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_CONNECTION_STRING!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err: any) => {
      throw err
    })
}

export default connectToDatabase
