import { useState } from "react"
import Navbar from "../components/Navbar"
import API from "../api"

function VehicleForm(){

const [form,setForm]=useState({
name:"",
enrollmentNumber:"",
department:"",
vehicleNumber:"",
vehicleType:"",
rfidUUID:""
})

const [qr,setQr]=useState("")

const handleChange=(e)=>{
setForm({
...form,
[e.target.name]:e.target.value
})
}

const submit=async(e)=>{
e.preventDefault()

try{

const res = await API.post("/vehicle/create",form);

setQr(res.data.qr)

alert("Vehicle Registered Successfully")

}catch(err){
console.log(err)
alert("Error registering vehicle")
}

}

return(

<div>

<Navbar/>

<div className="flex justify-center mt-10">

<div className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-xl font-bold mb-4 text-center">
Register Vehicle
</h2>

<form onSubmit={submit} className="flex flex-col gap-3">

<input
className="border p-2 rounded"
name="name"
placeholder="Student Name"
value={form.name}
onChange={handleChange}
/>

<input
className="border p-2 rounded"
name="enrollmentNumber"
placeholder="Enrollment Number"
value={form.enrollmentNumber}
onChange={handleChange}
/>

<input
className="border p-2 rounded"
name="department"
placeholder="Department"
value={form.department}
onChange={handleChange}
/>

<input
className="border p-2 rounded"
name="vehicleNumber"
placeholder="Vehicle Number"
value={form.vehicleNumber}
onChange={handleChange}
/>

<input
className="border p-2 rounded"
name="vehicleType"
placeholder="Vehicle Type (Bike/Car)"
value={form.vehicleType}
onChange={handleChange}
/>

<input
className="border p-2 rounded"
name="rfidUUID"
placeholder="RFID Tag ID"
value={form.rfidUUID}
onChange={handleChange}
/>

<button
className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
>
Submit
</button>

</form>

{qr &&(

<div className="mt-6 text-center">

<h3 className="font-bold">Vehicle QR Code</h3>

<img
className="mx-auto mt-2"
src={qr}
alt="qr"
/>

</div>

)}

</div>

</div>

</div>

)

}

export default VehicleForm