//imports
const express = require("express");
const app = express();

//importing routes
const testRoutes = require("./routes/Test");

const database = require("./config/database");
const cors = require("cors");
require("dotenv").config();

//getting environment variables
const PORT = process.env.PORT || 4000;

//connect to database
database.connect();

//apply middlewares
app.use(express.json());
app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

//routes
app.use("/api/v1/", testRoutes);

//default route
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Your server is up and running..."
    })
})

//running the server
app.listen(PORT, () => {
    console.log(`Server Started Successfully at port: ${PORT}`);
})