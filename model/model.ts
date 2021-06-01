import mongoose from 'mongoose'
import express from 'express'
const app = express()

import InstructorModel from './Instructor'

import { specialtyI } from '../interface/index'

mongoose.set('returnOriginal', false)
const connectToDatabase = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PASSWORD}
      @cluster0.oygyj.mongodb.net/${process.env.DATABASE_DEFAULT_DATABASE}
      ?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .catch((err: any) => {
      throw err
    })
}

export default class model {
  createInstructor = async (
    firstName: string,
    lastName: string,
    specialty: specialtyI,
    scientificLevel: string,
    departmentName: string,
    departmentNumericId: number,
    departmentId: string
  ) => {
    try {
      const instructorDoc = new InstructorModel({
        fName: firstName,
        lName: lastName,
        specialty: specialty,
        rank: scientificLevel,
        departmentInfo: {
          name: departmentName,
          _id: departmentId,
          numericID: departmentNumericId,
        },
      })
      const createdInstructor = await instructorDoc.save()
      return createdInstructor
    } catch (error) {
      throw error
    }
  }
}
