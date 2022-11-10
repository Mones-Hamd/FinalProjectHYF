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
  required: { type: Boolean },
  max: { type: Number },
  min: { type: Number },
  after: { type: String },
  before: { type: String },
});

const optionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
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
      options: [{ type: optionSchema }],
    },
  ],
  url: { type: String, required: true, unique: true },
});

const Event = mongoose.model("events", eventSchema);

export default Event;
