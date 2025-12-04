import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const Batch = mongoose.model("Batch", batchSchema);
export default Batch;
