const ApiModel = require("../models/api.model");
const subscriptionModel = require("../models/subscription.model");

exports.apiAuthenticateMW = async (req, res, next) => {
  try {
    const apiId = req.params.apiId;
    const apiKey = req.header("x-api-key");

    if (!apiId) {
      return res.status(400).json({
        message: "API ID is required",
      });
    }

    if (!apiKey) {
      return res.status(400).json({
        message: "API key is required",
      });
    }

    const findAPI = await ApiModel.findById(apiId);

    if (!findAPI) {
      return res.status(404).json({
        message: "API not found",
      });
    }

    const subscription = await subscriptionModel.findOne({
      apiKey,
      api: apiId,
      consumer: req.user.userId,
    });

    if (!subscription || subscription.status !== "ACTIVE") {
      return res.status(403).json({
        message: "Invalid or inactive API key",
      });
    }

    req.subscription = subscription;
    req.api = findAPI;

    next();
  } catch (error) {
    next(error);
  }
};
