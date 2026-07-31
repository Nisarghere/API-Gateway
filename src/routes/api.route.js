const { Router } = require("express");
const { apiController } = require("../controllers/api.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router()

router.post('/api',authMiddleware, apiController )

module.exports = router