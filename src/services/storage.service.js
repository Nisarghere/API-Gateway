const ImageKit = require("@imagekit/nodejs");

const imagekitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

exports.uploadFile = async (file) => {
  const result = await imagekitClient.files.upload({
    file,
    fileName: "logo_" + Date.now(),
    folder: "Smash-Api/logo",
  });
  return result;
};

exports.generateOpenApi = (api) => {
  const paths = {};
  
  api.endpoints.forEach((endpoint) => {
    const path = "/" + endpoint.path.replace(/:([^/]+)/g, "{$1}");

    if (!paths[path]) paths[path] = {};

    paths[path][endpoint.method.toLowerCase()] = {
      summary: "endpoint.description",
    };
  });

  const openApiDocument = {
    openapi: "3.0.3",
    info: {
      title: api.title,
      version: api.version,
    },
    servers: [
      {
        url: api.baseUrl,
      },
    ],
    paths,
  };
  return openApiDocument;
};
