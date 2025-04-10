const express = require("express");
const {
  loginController,
  registerController,
  authController
  
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/RegisterPage", registerController);

// AUTH || POST
router.get("/getUserData", authMiddleware, authController);
 

module.exports = router;