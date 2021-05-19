import { Schema, model } from 'mongoose'

const ThesisSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  approvalData: {
    type: Schema.Types.Date,
    required: true,
  },

  defenceDate: {
    type: Schema.Types.Date,
    required: true,
  },

  finishDate: {
    type: Schema.Types.Date,
    required: true,
  },

  score: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  student: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  guide: {
    type: Schema.Types.ObjectId,
  },

  advisor: {
    type: Schema.Types.ObjectId,
  },

  judge: {
    type: Schema.Types.ObjectId,
  },

  supervisor: {
    type: Schema.Types.ObjectId,
  },
})

const ThesisModel = model('Thesis', ThesisSchema)

export default ThesisModel
