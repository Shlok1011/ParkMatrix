import { useEffect,useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import Navbar from "../components/Navbar"
import API from "../api"

function ScanPage(){

const [data,setData]=useState(null)

useEffect(()=>{

const scanner=new Html5QrcodeScanner(
"reader",
{fps:10,qrbox:250},
false
)

scanner.render(
async(decodedText)=>{

const res=await API.get(`/vehicle/${decodedText}`)

setData(res.data)

},
(error)=>{}
)

},[])

return(

<div>

<Navbar/>

<div className="p-10 flex flex-col items-center">

<h2 className="text-xl font-bold mb-4">Scan Vehicle QR</h2>

<div id="reader" className="w-80"></div>

{data &&(

<div className="bg-white p-6 rounded-xl shadow mt-6 w-80">

<h3 className="font-bold mb-2">Vehicle Details</h3>

<p>Name: {data.name}</p>
<p>Vehicle: {data.vehicleNumber}</p>
<p>Department: {data.department}</p>
<p>vehicalType: {data.vehicleType}</p>

<button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md">
Contact admin to complain
</button>

</div>
)}

</div>

</div>

)

}

export default ScanPage