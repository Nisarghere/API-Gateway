const ApiModel = require("../models/api.model");
const axios = require("axios");

exports.consumerController = async (req, res) => {
  try {
    const api = req.api;

    const path = "/" + req.params.path.join("/");

    const endpointExist = api.endpoints.some(
      (endpoint) => endpoint.path === path && endpoint.method === req.method,
    );

    if (!endpointExist) {
      return res.status(404).json({
        message: "endpoint not found",
      });
    }

    const providerUrl = `${api.baseUrl}${path}`

    const response = await axios({
      method: req.method,
      url: providerUrl,
      params: req.query,
      data: req.body,
    });

    return res.status(response.status).json(response.data);
  } catch (err) {
    return res.status(500).json({
      message: "Error while forwarding request",
    });
  }
};
