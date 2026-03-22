import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

function Home(){

const navigate = useNavigate()

return(

<div className="relative min-h-screen bg-gray-100">

<Navbar/>

{/* Background Text */}
<h1 className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2
text-[160px] font-extrabold text-transparent bg-clip-text
bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500
opacity-20 select-none pointer-events-none">
SCETATHON
</h1>

{/* Cards */}
<div className="relative p-10 grid grid-cols-3 gap-6 z-10">

<div
className="bg-white p-6 rounded-xl shadow hover:scale-105 transition cursor-pointer"
onClick={() => navigate("/form")}
>

<h3 className="text-lg font-bold">Register Vehicle</h3>
<p>Add your vehicle to the system</p>

</div>

<div
className="bg-white p-6 rounded-xl shadow hover:scale-105 transition cursor-pointer"
onClick={() => navigate("/scan")}
>

<h3 className="text-lg font-bold">Scan QR</h3>
<p>Verify vehicle entry</p>

</div>

<div
className="bg-white p-6 rounded-xl shadow hover:scale-105 transition cursor-pointer"
onClick={() => navigate("/parking-status")}
>

<h3 className="text-lg font-bold">Parking Status</h3>
<p>View parking activity</p>

</div>

</div>

</div>

)

}

export default Home