const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { consumerController } = require("../controllers/consumer.controller");
const { apiAuthenticateMW } = require("../middlewares/consumer.middleware");
const { rateLimiterMW } = require("../middlewares/ratelimit.middleware");


const router = Router()


router.all('/proxy/:apiId/*path', authMiddleware, apiAuthenticateMW, rateLimiterMW,  consumerController)


module.exports = router