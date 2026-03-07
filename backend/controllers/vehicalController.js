import UserVehical from "../models/userVehical.js"
import QRCode from "qrcode"

export const createVehical = async (req, res) => {

  try {

    const newUser = new UserVehical(req.body)
    console.log(req.body);
    await newUser.save()

    const qrImage = await QRCode.toDataURL(newUser.vehical_ID)

    newUser.qrCode = qrImage

    await newUser.save()

    res.json({
      message: "Vehical Registered",
      vehical_ID: newUser.vehical_ID,
      qr: qrImage
    })

  } catch (err) {

    res.status(500).json(err)
    console.log(err);

  }

}






export const getVehicalByID = async (req, res) => {

  try {

    const data = await UserVehical.findOne({
      vehical_ID: req.params.id
    })

    if (!data) {

      return res.status(404).json({
        message: "Vehical not found"
      })

    }
    console.log(data.vehical_ID);
    res.json(data)

  } catch (err) {
    console.log(err)
    res.status(500).json(err)

  }

}


export const getQRCode = async (req, res) => {

  try {

    const user = await UserVehical.findOne({
      vehical_ID: req.params.id
    })

    res.json({
      qr: user.qrCode
    })

  } catch (err) {

    res.status(500).json(err)

  }

}