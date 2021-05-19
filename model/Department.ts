import { Schema, model } from 'mongoose'

const DepartmentModel = new Schema({
  name: {
    type: String,
    required: true,
  },

  Manager: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

module.exports = model('Department', DepartmentModel)
