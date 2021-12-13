const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    date: {
      type: String,
      require: true,
    },
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
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

transactionSchema.pre("save", function (next) {
  const formatedDate = new Date(this.date);
  this.date = Date.parse(formatedDate);
  this.year = formatedDate.getFullYear();
  this.month = formatedDate.getMonth() + 1;
  this.day = formatedDate.getDay();
  next();
});

const Task = model("transaction", taskSchema);

module.exports = Task;
