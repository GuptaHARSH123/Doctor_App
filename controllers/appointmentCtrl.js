const Appointment = require("../models/appointment");


const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, patientName, phoneNumber ,userId,doctorName ,  patient_email} = req.body; 
    const existingAppointment = await Appointment.findOne({ doctor: doctorId, date, timeSlot });

    if (existingAppointment) {
      return res.status(400).json({ 
        success: false, 
        message: "This time slot is already booked. Please choose another time." 
      });
    }

    console.log(`User ID: ${userId}, Date: ${date}, Slot: ${timeSlot}`);

    const newAppointment = new Appointment({
      doctor: doctorId,
      patient: userId,
      patientName,
      phoneNumber,
      patient_email,
      date,   
      doctorName,      
      timeSlot,     
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Error: ${error.message}` });
  }
};

const getAppointmentList = async (req, res) => {
  try {
    const { doctorId } = req.query;  

    let query = {};
    if (doctorId) {
      query.doctor = doctorId; 
    }

    
    const appointments = await Appointment.find(query);

     
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found." });
    }
 
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching appointments.',
      error: error.message,
    });
  }
};
const MyAppointmentList = async (req, res) => {
  try {
    const { userId } = req.query;  

    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

 
    const appointments = await Appointment.find({ patient: userId });   
  
    if (appointments.length === 0) {
      return res.status(404).json({ success: false, message: "No appointments found." });
    }

    
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching appointments.",
      error: error.message,
    });
  }
};

 
const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;  
  const { status } = req.body;  

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found." });
    }

    appointment.status = status;  
    await appointment.save();

    res.status(200).json({ success: true, message: `Appointment ${status} successfully.` });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ success: false, message: "Failed to update appointment status." });
  }
};



 



 
 

module.exports = { bookAppointment, getAppointmentList , MyAppointmentList ,updateAppointmentStatus};
