const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { consumerController } = require("../controllers/consumer.controller");
const { apiAuthenticateMW } = require("../middlewares/consumer.middleware");


const router = Router()


router.get('/proxy', authMiddleware, apiAuthenticateMW,  consumerController)


module.exports = router