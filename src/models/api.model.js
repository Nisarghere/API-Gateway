const mongoose = require("mongoose");

const ApiSchema = new mongoose.Schema(
  {
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    logo: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    baseUrl: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (value) {
          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        },
        message: (props) => `${props.value} is not a valid URL`,
      },
    },

    endpoints: [
      {
        path: {
          type: String,
          required: true,
        },
        method: {
          type: String,
          enum: ["GET", "POST", "PUT", "DELETE"],
          required: true,
        },
        description: {
          type: String,
          required: false,
          trim: true,
        },
      },
    ],

    version: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    ratelimit: {
      window: {
        type: Number,
        default: 60,
      },
      requests: {
        type: Number,
        default: 100,
      },
    },
  },
  {
    timestamps: true,
  },
);

const ApiModel = mongoose.model("api", ApiSchema);

module.exports = ApiModel;
