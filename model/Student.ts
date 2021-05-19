import { Schema, model } from 'mongoose'

const StudentModel = new Schema({
  studentNumericId: {
    type: Number,
    required: true,
  },

  fName: {
    type: String,
    required: true,
  },

  lName: {
    type: String,
    required: true,
  },

  major: {
    type: String,
    required: true,
  },

  grade: {
    type: String,
    required: true,
  },

  entrance: {
    type: Schema.Types.Date,
    required: true,
  },

  department: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

module.exports = model('Student', StudentModel)
