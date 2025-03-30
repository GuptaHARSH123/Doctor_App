const express = require("express");
const { bookAppointment, getAppointmentList ,MyAppointmentList ,updateAppointmentStatus } = require("../controllers/appointmentCtrl");

const router = express.Router();

 
router.post("/book" ,bookAppointment);
router.get('/appointments', getAppointmentList);
router.get('/Myappointments', MyAppointmentList );
router.put("/updateStatus/:appointmentId", updateAppointmentStatus);

module.exports = router;
