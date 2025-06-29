const expres = require('express');
const colors = require("colors")
const dotenv = require("dotenv");
const morgan = require("morgan");
const ConnectDB = require('./config/db');
const cors = require('cors');
 
 
dotenv.config();

ConnectDB();
const app = expres()
app.use(cors({
    origin: "*", // or specific origin like 'http://localhost:3000'
    methods: ["POST", "GET" , "PUT" , "DELETE"]
  }));

app.use(expres.json())
app.use(morgan("dev"))
 


 
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));
app.use("/api/v1/appointments",require("./routes/appointmentRoutes"));

 
const port  = process.env.PORT || 8080

 

app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_MODE}`.bgBlue.black);
}
)
