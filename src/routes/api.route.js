const { Router } = require("express");
const { apiController, getApiController, useApiKeyController } = require("../controllers/api.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
 

const router = Router()

 

router.post('/publish',authMiddleware,  apiController )
router.get('/', authMiddleware, getApiController)
router.post('/:apiId/subscribe', authMiddleware, useApiKeyController)

module.exports = router