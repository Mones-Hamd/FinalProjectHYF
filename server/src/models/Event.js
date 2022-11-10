import mongoose from "mongoose";

const templateDetailsSchema = new mongoose.Schema({
  eventTitle: { type: String },
  brideName: { type: String, required: true },
  groomName: { type: String, required: true },
  date: { type: Date, required: true },
  address: { type: String },
  description: { type: String },
  contactNumber: { type: String },
  images: { type: Array },
});

const attributesSchema = new mongoose.Schema({
  type: { type: String, required: true },
  required: { type: Boolean, default: false },
  max: { type: Number, default: 10 },
  min: { type: Number, default: 0 },
  after: { type: String },
  before: { type: String },
});

const eventSchema = new mongoose.Schema({
  creatorId: { type: String, required: true },
  creatorName: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  isPrivate: { type: Boolean, default: false },
  type: { type: String, default: "WEDDING" },
  template: { type: String, default: "DEFAULT" },
  templateDetails: { type: templateDetailsSchema, required: true },
  form: [
    {
      key: String,
      label: String,
      attributes: { type: attributesSchema, required: false },
    },
  ],
});

const Event = mongoose.model("events", eventSchema);

export default Event;
