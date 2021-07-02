import { Schema, model } from 'mongoose'

const ThesisSchema = new Schema({
  title: {
    type: String,
  },

  approvalDate: {
    type: Schema.Types.Date,
  },

  defenceDate: {
    type: Schema.Types.Date,
  },

  finishDate: {
    type: Schema.Types.Date,
  },

  score: {
    type: Number,
  },

  status: {
    type: String,
    enum: ['pending'],
    required: true,
  },

  studentId: {
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

  referees: [{ type: Schema.Types.ObjectId }],
})

const ThesisModel = model('Thesis', ThesisSchema)
export default ThesisModel
