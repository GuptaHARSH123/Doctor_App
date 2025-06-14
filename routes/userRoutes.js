const express = require("express");
const {
  loginController,
  registerController,
  authController
  
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
 
const router = express.Router();
 
router.post("/login", loginController);
 
router.post("/RegisterPage", registerController);

 
router.get("/getUserData", authMiddleware, authController);
 

module.exports = router;