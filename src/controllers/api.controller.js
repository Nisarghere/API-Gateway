const ApiModel = require("../models/api.model");

exports.apiController = async (req, res) => {
  const { title, baseurl, endpoints, version } = req.body;

  if (!title || !baseurl || !endpoints || !version) {
    return res.status(400).json({
      message: "All fields are required.",
    });
  }

  if (!Array.isArray(endpoints) || endpoints.length === 0) {
    return res.status(400).json({
      message: "At least one endpoint is required.",
    });
  }

  try {
    const isApiExist = await ApiModel.findOne({
      publisher: req.user.userId,
      title,
      version,
    });

    if (isApiExist) {
      return res.status(409).json({
        message: "API already exist",
      });
    }

    const api = await ApiModel.create({
      publisher: req.user.userId,
      title,
      baseUrl: baseurl,
      endpoints,
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
