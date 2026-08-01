const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const subscriptionSchema = new mongoose.Schema(
  {
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    api: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "api",
    },
    apiKey: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      required: true,
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

// subscriptionSchema.pre("save", async function (next) {
//   if (!this.isModified("apiKey")) return;

//   const hashKey = await bcrypt.hash(this.apiKey, 10);
//   this.apiKey = hashKey;
// });

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);

module.exports = subscriptionModel;
