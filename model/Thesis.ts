import { Schema, model } from 'mongoose'

const ThesisSchema = new Schema({
  title: {
    title: {
      type: String,
    },

    status: {
      type: String,
      enum: ['pending', 'approved'],
    },
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
    _id: {
      type: Schema.Types.ObjectId,
    },

    status: {
      type: String,
      enum: ['pending', 'approved'],
    },
  },

  advisor: {
    _id: {
      type: Schema.Types.ObjectId,
    },

    status: {
      type: String,
      enum: ['pending', 'approved'],
    },
  },

  supervisor: {
    _id: {
      type: Schema.Types.ObjectId,
    },

    status: {
      type: String,
      enum: ['pending', 'approved'],
    },
  },

  referees: [{ type: Schema.Types.ObjectId }],
})

const ThesisModel = model('Thesis', ThesisSchema)
export default ThesisModel
