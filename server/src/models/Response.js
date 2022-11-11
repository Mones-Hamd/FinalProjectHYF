import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema({
  questionKey: { type: String, required: true },
  questionText: { type: String, required: true },
});
const answerSchema = new mongoose.Schema({
  answerKey: { type: String, required: true },
  answerValue: { type: Schema.Types.Mixed, required: true },
});
const responseSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  guestEmail: {
    type: String,
    required: true,
  },
  responses: [
    {
      question: questionSchema,
      answer: answerSchema,
    },
  ],
});
const Response = mongoose.model("responses", responseSchema);
export default Response;
