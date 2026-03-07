import express from "express"

import {updateParking , getParkingData}  from "../controllers/parkingController.js"

const router = express.Router()

router.post("/update", updateParking)
router.get("/parking-data", getParkingData)

export default router