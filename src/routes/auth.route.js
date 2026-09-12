const {Router}  = require("express");
const {registerController, loginController, LogOutGetCOntroller, LogOutController} = require('../controllers/auth.controller');
const { authMiddleware } = require("../middlewares/auth.middleware");


const router = Router()

router.post('/register', registerController )
router.post('/login', loginController)
router.get('/me', authMiddleware , LogOutGetCOntroller)
router.post('/logout', authMiddleware, LogOutController)


module.exports = router