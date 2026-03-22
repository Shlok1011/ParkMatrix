import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

function ParkingDashboard() {

const [vehicles, setVehicles] = useState([])

useEffect(() => {

const normalize = (id) => id?.toString().trim().toLowerCase()

const fetchData = async () => {

try {

const parkingRes = await fetch("http://localhost:5000/api/parking/parking-data")
const parkingData = await parkingRes.json()

const userRes = await fetch("http://localhost:5000/api/user-Vehicals")
const users = await userRes.json()

const mergedData = (Array.isArray(parkingData) ? parkingData : []).map(p => {

const user = (Array.isArray(users) ? users : []).find(
u => normalize(u.rfidUUID) === normalize(p.uid)
)

if (!user) {
console.log("No user found for UID:", p.uid)
}

return {
...p,
userDetails: user
}

})

setVehicles(mergedData)

} catch(err) {
console.log(err)
}

}

fetchData()

const interval = setInterval(fetchData,3000)

return () => clearInterval(interval)

}, [])


// -------- PARKING SLOT LOGIC --------

const totalSlots = 3

const vehiclesInside = vehicles.filter(v => !v.exitTime).length

const remainingSlots = totalSlots - vehiclesInside

// ------------------------------------


return (

<div>

{/* Navbar */}
<Navbar />

{/* Dashboard */}
<div className="p-8 bg-gray-100 min-h-screen">

<h1 className="text-3xl font-bold text-center mb-8">
Campus Parking Dashboard
</h1>

<h5 className="text-3xl font-bold text-center mb-8">
parking -1 
</h5>

{/* Parking Slot Stats */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

<div className="bg-white shadow-lg rounded-xl p-6 text-center">
<h2 className="text-lg font-semibold">Total Slots</h2>
<p className="text-3xl font-bold text-blue-600">{totalSlots}</p>
</div>

<div className="bg-white shadow-lg rounded-xl p-6 text-center">
<h2 className="text-lg font-semibold">Occupied</h2>
<p className="text-3xl font-bold text-red-500">{vehiclesInside}</p>
</div>

<div className="bg-white shadow-lg rounded-xl p-6 text-center">
<h2 className="text-lg font-semibold">Slots Available</h2>
<p className="text-3xl font-bold text-green-600">{remainingSlots}</p>
</div>

</div>



{/* Vehicle Cards */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{vehicles.map((v,index)=>{

const user = v.userDetails

return(

<div key={index} className="bg-white shadow-lg rounded-xl p-6 relative">

<div
className={`w-4 h-4 rounded-full absolute right-5 top-5 ${
v.exitTime ? "bg-red-500" : "bg-green-500"
}`}
></div>

<h2 className="text-xl font-bold">
{user?.name || "Unknown User"}
</h2>

<p>Enrollment: {user?.enrollmentNumber || "N/A"}</p>
<p>Department: {user?.department || "N/A"}</p>
<p>Vehicle: {user?.vehicleType || "N/A"}</p>

<p>UID: {v.uid}</p>
<p>Zone: {v.zone}</p>

<p>
Entry: {v.entryTime
? new Date(v.entryTime).toLocaleString()
: "N/A"}
</p>

<p>
Exit: {v.exitTime
? new Date(v.exitTime).toLocaleString()
: "Still Inside"}
</p>

</div>

)

})}

</div>

</div>

</div>

)

}

export default ParkingDashboard