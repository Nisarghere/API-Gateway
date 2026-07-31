const {Router}  = require("express");
const {registerController, loginController} = require('../controllers/auth.controller');
const { authMiddleware } = require("../middlewares/auth.middleware");


const router = Router()

router.post('/register', registerController )
router.post('/login', loginController)


module.exports = router