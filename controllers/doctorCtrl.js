const bcrypt = require("bcryptjs");
const Doctor = require("../models/doctors");  
const Appointment = require('../models/appointment')
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
  try {
    
    const existingUser = await Doctor.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }

    
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

   
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();

    
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
   
    const doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor) {
      return res
        .status(200)
        .send({ message: "Doctor not found", success: false });
    }

     
    const isMatch = await bcrypt.compare(req.body.password, doctor.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Email or Password", success: false });
    }

    
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Login Controller: ${error.message}`,
    });
  }
};
const authController = async (req, res) => {
  try {
    // console.log(req)
    const doctor = await Doctor.findOne({ _id: req.body.userId });
    console.log(doctor)
    if (!doctor) {
      return res.status(200).send({
        message: "doctor not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: doctor.name,
          email: doctor.email,
          id:doctor._id
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};
const searchDoctor = async (req, res) => {
  try {
    const { query } = req.query;

    let doctors;

    if (!query || query.trim() === '') {
      // No search query → return all doctors
      doctors = await Doctor.find();
    } else {
      // Search query exists → filter by name or specialization (case-insensitive)
      const regex = new RegExp(query, 'i');
      doctors = await Doctor.find({
        $or: [{ name: regex }, { specialization: regex }],
      });
    }

    res.status(200).json({ success: true, data: doctors });
  } catch (err) {
    console.error('Error in searchDoctor:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

 

module.exports = { 
  registerController, 
  loginController, 
  authController,
  searchDoctor
};