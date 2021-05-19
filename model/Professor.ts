import { Schema, model } from 'mongoose'

const ProfessorModel = new Schema({
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
    department: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    numericID: {
      type: Number,
      required: false,
    },
  },
})

module.exports = model('Professor', ProfessorModel)
