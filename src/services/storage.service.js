const ImageKit = require("@imagekit/nodejs");

const imagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
    const result = await imagekitClient.files.upload({
        file,
        fileName: "logo_" + Date.now(),
        folder:"Smash-Api/logo"

    })
    return result
}

module.exports = uploadFile