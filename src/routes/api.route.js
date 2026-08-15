const { Router } = require("express");
const { apiController, getApiController, useApiKeyController } = require("../controllers/api.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const multer = require("multer");


const router = Router()

const upload = multer({storage:multer.memoryStorage()})


router.post('/publish',authMiddleware, upload.single("logo"), apiController )
router.get('/', authMiddleware, getApiController)
router.post('/:apiId/subscribe', authMiddleware, useApiKeyController)

module.exports = router