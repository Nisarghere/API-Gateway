const ApiModel = require("../models/api.model");
const axios = require("axios");
const {match} = require("path-to-regexp")

exports.consumerController = async (req, res) => {
  try {
    const api = req.api;

    const path = "/" + req.params.path.join("/");

    const endpointExist = api.endpoints.find(
      (endpoint) => { 
        if(endpoint.method !== req.method) 
          return false;

        const matcher = match(endpoint.path)

        return matcher(path)
      }
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
