const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  specialization: {
    type: String,
    required: [true, "Specialization is require"],
  },
  experience: {
    type: String,
    required: [true, "Experience is require"],
  },
  location: {
    type: String,
    required: [true, "Location is require"],
  },
  fee: {
    type: String,
    required: [true, "fee is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },

   
});

const Doctor = mongoose.model("doctors", doctorSchema);

module.exports = Doctor;