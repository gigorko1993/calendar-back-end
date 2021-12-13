const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Task = model("transaction", taskSchema);

module.exports = Task;
