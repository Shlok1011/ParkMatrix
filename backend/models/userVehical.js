import mongoose from "mongoose"

const userVehicalSchema = new mongoose.Schema({

  vehical_ID: {
    type: String,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  enrollmentNumber: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  vehicleNumber: {
    type: String,
    required: true
  },

  vehicleType: {
    type: String,
    required: true
  },

  rfidUUID: {
    type: String
  },

  qrCode: {
    type: String
  }

})

userVehicalSchema.pre("save", async function (next) {

  if (!this.vehical_ID) {

    const count = await this.constructor.countDocuments()

    this.vehical_ID = "VH" + (1000 + count + 1)

  }

})

const UserVehical = mongoose.model("userVehical", userVehicalSchema)

export default UserVehical