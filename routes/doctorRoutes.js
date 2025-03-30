const express = require('express')
const {registerController , loginController , authController ,getDoctorList} =require("../controllers/doctorCtrl")
const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()

router.post('/doctorRegisterPage', registerController)
router.post("/doctorLogin" , loginController )
router.get("/getDoctorData" , authMiddleware , authController)
router.get('/doctors', getDoctorList); 


module.exports = router;