import { Schema, model } from 'mongoose'

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  Manager: {
    type: Schema.Types.ObjectId,
    required: true,
  },
})

const DepartmentModel = model('Department', DepartmentSchema)
export default DepartmentModel
