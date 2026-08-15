const ImageKit = require("@imagekit/nodejs");

const imagekitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  const result = await imagekitClient.files.upload({
    file: file,
    fileName: "Logo_" + Date.now(),
    folder: "API-backend/logo",
  });

  return result
}

module.exports = uploadFile
