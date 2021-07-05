import { Schema, model, Types } from 'mongoose'

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
      type: String,
      required: true,
    },
  ],

  rank: {
    type: Number,
    required: true,
  },

  numericId: {
    type: String,
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

  roles: [
    {
      role: {
        type: String,
        enum: ['guide', 'advisor', 'supervisor', 'referee'],
      },

      status: {
        type: String,
        enum: ['pending, confirmed'],
      },

      thesisId: Schema.Types.ObjectId,
    },
  ],
})

const InstructorModel = model('Instructor', InstructorSchema)
export default InstructorModel
