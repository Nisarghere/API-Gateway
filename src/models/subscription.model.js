const mongoose = require("mongoose");
const crypto = require("crypto");

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
    ratelimit:{
      window:Number,
      requests:Number
    },
    status: {
      type: String,
      enum: ["ACTIVE", "REVOKED"],
      required: true,
      default: "ACTIVE",
    },
  },
  { timestamps: true },
);

subscriptionSchema.statics.hashApiKey  = function (apiKey){
    return crypto.createHash("sha256").update(apiKey).digest("hex")

}

  

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);

module.exports = {subscriptionModel, hashedKey };
