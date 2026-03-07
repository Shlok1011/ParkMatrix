import express from "express"

import {
  createVehical,
  getVehicalByID,
  getQRCode
} from "../controllers/vehicalController.js"

const router = express.Router()

router.post("/create", createVehical)

router.get("/:id", getVehicalByID)

router.get("/qr/:id", getQRCode)

export default router