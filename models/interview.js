const mongoose = require("mongoose");

//create the DB schema
const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        result: {
          type: String,
          enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
