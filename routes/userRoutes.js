const { Router } = require("express");
const { postLogin, postSignup } = require("../controllers/userController");
const router = Router();

router.post("/login", postLogin);
router.post("/signup", postSignup);

module.exports = router;
