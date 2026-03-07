import mongoose from "mongoose"

const parkingSchema = new mongoose.Schema({

uid: {
type: String,
required: true
},

zone: {
type: String,
required: true
},

entryTime: {
type: Date
},

exitTime: {
type: Date
}

})

const Parking = mongoose.model("Parking", parkingSchema)

export default Parking