const ApiModel = require("../models/api.model");
const subscriptionModel = require("../models/subscription.model");

exports.rotateMiddleWare = async (req, res, next) => {
  try {
    const apiId = req.params.apiId;
    const subId = req.params.subId;

    if (!apiId) {
      return res.status(400).json({
        message: "API ID is required",
      });
    }
    if (!subId) {
      return res.status(400).json({
        message: "Subscription Id is required",
      });
    }

    
    const subscription = await subscriptionModel.findOne({
      _id: subId,
      api: apiId,
      consumer: req.user.userId,
    });
    if (!subscription) {
      return res.status(404).json({
        message: "Subscription not found",
      });
    }

    // if (subscription.status === "REVOKED") {
    //   return res.status(404).json({
    //     message: "Subscription has been revoked",
    //   });
    // }
    req.subscription = subscription;
    req.api = api;
    next();
  } catch (error) {
    next(error);
  }
};
