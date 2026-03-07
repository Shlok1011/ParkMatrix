import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import vehicalRoutes from "./routes/vehicalRoutes.js";
import parkingRouters from "./routes/parkingRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// error handeler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.get("/", async (req, res) => {
  res.send("Smart Parking Backend Running");
});


import UserVehical from "./models/userVehical.js"

app.get("/api/user-vehicals", async (req, res) => {
  try {
    const users = await UserVehical.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.use("/api/auth" , authRoutes);
app.use("/api/vehicle",vehicalRoutes);
app.use("/api/parking",parkingRouters)


const connectDB = () => {
    console.log(process.env.MONGODB_URL);
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => { console.log("MongoDB Connected") })
        .catch((err) => {
            console.error("Failed to connect to DB");
            console.error(err);
        })
}

const startServer = async () => {
    try {
        connectDB();
        app.listen(5000, "0.0.0.0" , () => console.log("Server started on port 5000 , on shlok pc :)"));
    } catch (error) {
        console.log(error);
    }
};
startServer();