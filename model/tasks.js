const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const taskSchema = new Schema(
  {
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
    // date: {
    //   type: String,
    //   require: true,
    // },
    // day: {
    //   type: Number,
    // },
    // month: {
    //   type: Number,
    // },
    // year: {
    //   type: Number,
    // },
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

taskSchema.pre("save", function (next) {
  const formatedDate = new Date(this.date);
  this.year = formatedDate.getFullYear();
  this.month = formatedDate.getMonth() + 1;
  this.day = formatedDate.getDay();
  next();
});

const Task = model("task", taskSchema);

module.exports = Task;
