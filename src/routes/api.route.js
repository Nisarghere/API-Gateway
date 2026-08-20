const { Router } = require("express");
const { apiController, getApiController, useApiKeyController, apiInfoController } = require("../controllers/api.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { apiAuthenticateMW } = require("../middlewares/consumer.middleware");

const multer = require("multer");
const { rateLimiterMW } = require("../middlewares/ratelimit.middleware");
 


const router = Router()

const upload = new multer({storage:multer.memoryStorage()}) 

router.post('/publish',authMiddleware, upload.single("logo"),  apiController )
router.get('/', authMiddleware, getApiController)
router.post('/:apiId/subscribe', authMiddleware, useApiKeyController)
router.get('/:apiId', authMiddleware, apiInfoController )
router.patch('/:apiId/:subId/rotate', authMiddleware,apiAuthenticateMW,rateLimiterMW, rotateApiController )

module.exports = router