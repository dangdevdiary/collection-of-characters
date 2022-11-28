const mongoose = require("mongoose");
const characterSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  createAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
module.exports = mongoose.model("Character", characterSchema);
