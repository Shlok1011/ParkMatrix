const QRCode = require("qrcode")

const generateQR = async(data)=>{

const qr = await QRCode.toDataURL(data)

return qr

}

module.exports = generateQR