const ApiModel = require("../models/api.model");
const subscriptionModel = require("../models/subscription.model");
const crypto = require("crypto");
const uploadFile = require("../services/storage.service");

exports.apiController = async (req, res) => {
  const {
    title,
    description,
    baseurl,
    endpoints,
    ratelimit,
    category,
    version,
  } = req.body; 

  const logo = req.file;
  const parsedEndpoints = JSON.parse(endpoints);

  const missingFields = [];

  if (!title) missingFields.push("title");
  if (!description) missingFields.push("description");
  if (!baseurl) missingFields.push("baseurl");
  if (!parsedEndpoints) missingFields.push("endpoints");
  if (!category) missingFields.push("category");
  if (!version) missingFields.push("version");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required fields",
      missingFields,
    });
  }

  if (!Array.isArray(parsedEndpoints) || parsedEndpoints.length === 0) {
    return res.status(400).json({
      message: "At least one endpoint is required.",
    });
  }

  try {
    const isApiExist = await ApiModel.findOne({
      publisher: req.user.userId,
      title,
      version,
      baseUrl: baseurl,
    });

    if (isApiExist) {
      return res.status(409).json({
        message: "API already exist",
      });
    }

    let logoUrl = null;
    if (logo) {
      const result = await uploadFile(logo.buffer.toString("base64"));
      logoUrl = result.url;
    }

    const api = await ApiModel.create({
      logo: logoUrl,
      publisher: req.user.userId,
      title,
      description,
      category,
      baseUrl: baseurl,
      ratelimit: ratelimit,
      endpoints: parsedEndpoints,
      version,
    });

    return res.status(201).json({
      message: "API created successfully",
      api,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong", err: err.message });
  }
};

exports.getApiController = async (req, res) => {
  const apis = await ApiModel.find();

  res.status(200).json({
    message: "All the Apis",
    apis,
  });
};

exports.useApiKeyController = async (req, res) => {
  const apiId = req.params.apiId;
  console.log(apiId);

  if (!apiId) {
    return res.status(400).json({
      message: "400 bad request",
    });
  }

  try {
    const api = await ApiModel.findOne({
      _id: apiId,
    });

    if (!api) {
      return res.status(404).json({
        message: "Api doesnt exist!",
      });
    }

    const subscriberFound = await subscriptionModel.findOne({
      consumer: req.user.userId,
      api: api._id,
    });

    if (subscriberFound) {
      return res.status(409).json({
        message: "You have already subcribed to this API",
      });
    }

     const apiKey = crypto.randomBytes(32).toString("hex");

    const subscribeApi = await subscriptionModel.create({
      consumer: req.user.userId,
      api: api._id,
      apiKey,
      ratelimit: api.ratelimit,
      status: "ACTIVE",
    });

    res.status(200).json({
      message: "API KEY generated successfully",
      apiKey,
    });

  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong", err: err.message });
  }
};

exports.apiInfoController = async (req, res) => {
  try {
    const { apiId } = req.params

    const api = await ApiModel.findById(apiId)

    if (!api) {
      return res.status(404).json({
        message: "API doesn't exist!"
      })
    }

    return res.status(200).json({
      message: "API fetched successfully",
      api
    })
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    })
  }
}