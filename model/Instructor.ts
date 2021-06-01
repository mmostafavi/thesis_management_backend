import { Schema, model } from 'mongoose'

const InstructorSchema = new Schema({
  authData: {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
  },

  fName: {
    type: String,
    required: true,
  },

  lName: {
    type: String,
    required: true,
  },

  specialty: [
    {
      type: Schema.Types.Date,
      required: true,
    },
  ],

  rank: {
    type: Number,
    required: true,
  },

  departmentInfo: {
    name: {
      type: String,
      require: true,
    },
    _id: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    numericID: {
      type: Number,
      required: false,
    },
  },
})

const InstructorModel = model('Instructor', InstructorSchema)
export default InstructorModel
