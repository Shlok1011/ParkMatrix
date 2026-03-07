// import Parking from "../models/parking.js"
// import UserVehical from "../models/userVehical.js";

// export const updateParking = async (req, res) => {
//   try {
//     console.log("something happen")
//     const { uid, zone, action, time } = req.body;
//     console.log(uid, zone, action, time);
//     if (action === "entry") {

//       const vehicle = new Parking({
//         uid,
//         zone,
//         entryTime: time
//       })

//       await vehicle.save()

//     }

//     if (action === "exit") {

//       const vehicle = await Parking.findOne({
//         uid,
//         exitTime: null
//       }).sort({ entryTime: -1 })

//       if (vehicle) {
//         vehicle.exitTime = time
//         await vehicle.save()
//       }

//     }

//     res.json({ message: "data stored" })

//   } catch (error) {

//     res.status(500).json({ error: error.message })

//   }
// }














// export const getParkingData = async (req, res) => {
//   try {

//     const data = await Parking.aggregate([
//       {
//         $lookup: {
//           from: "UserVehical",
//           localField: "rfidUUID",
//           foreignField: "uid",
//           as: "userDetails"
//         }
//       },
//       {
//         $unwind: "$userDetails"
//       }
//     ])

//     res.json(data)

//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }







import Parking from "../models/parking.js";
import UserVehical from "../models/userVehical.js";

/* =========================================
   UPDATE PARKING (ENTRY / EXIT)
========================================= */

export const updateParking = async (req, res) => {

  try {

    console.log("📡 ESP32 Request Received");
    console.log(req.body);

    const { uid, zone, action, time } = req.body;

    // basic validation
    if (!uid || !zone || !action) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    /* -------- VEHICLE ENTRY -------- */

    if (action === "entry") {

      const vehicle = new Parking({
        uid: uid,
        zone: zone,
        entryTime: Number(time) || Date.now(),
        exitTime: null
      });

      await vehicle.save();

      console.log("✅ Vehicle Entry Stored");

    }

    /* -------- VEHICLE EXIT -------- */

    if (action === "exit") {

      const vehicle = await Parking.findOne({
        uid: uid,
        exitTime: null
      }).sort({ entryTime: -1 });

      if (vehicle) {

        vehicle.exitTime = Number(time) || Date.now();

        await vehicle.save();

        console.log("🚗 Vehicle Exit Updated");

      } else {

        console.log("⚠️ No active entry found for UID:", uid);

      }

    }

    return res.status(200).json({
      success: true,
      message: "Parking data stored"
    });

  } catch (error) {

    console.error("❌ Parking Update Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }
};


/* =========================================
   GET PARKING DATA (FOR DASHBOARD)
========================================= */

export const getParkingData = async (req, res) => {

  try {

    const data = await Parking.aggregate([
      {
        $lookup: {
          from: "uservehicals",   // MongoDB collection name (usually lowercase plural)
          localField: "uid",
          foreignField: "rfidUUID",
          as: "userDetails"
        }
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    res.status(200).json(data);

  } catch (error) {

    console.error("❌ Get Parking Data Error:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};