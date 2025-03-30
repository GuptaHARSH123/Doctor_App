const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: String, 
    required: true,
  },
  patient: {
    type: String, 
    required: true,
  },
  patient_email:{
    type: String,
    required:true,
  },
  phoneNumber:{
    type:String,
    required:true,
  },
  patientName:{
    type:String,
    required:true
  },
  timeSlot: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
   
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
