const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, required: false },
  answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
}, { timestamps: true });


module.exports = model('Question', questionSchema);