import { useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"

function Signup(){

const navigate=useNavigate()

const [form,setForm]=useState({
name:"",
email:"",
password:""
})

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const submit=async(e)=>{
e.preventDefault()

await API.post("/auth/register",form)

alert("Account Created")

navigate("/")
}

return(

<div className="flex items-center justify-center h-screen">

<div className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

<form onSubmit={submit} className="flex flex-col gap-4">

<input className="border p-3 rounded-lg" name="name" placeholder="Name" onChange={handleChange}/>

<input className="border p-3 rounded-lg" name="email" placeholder="Email" onChange={handleChange}/>

<input className="border p-3 rounded-lg" type="password" name="password" placeholder="Password" onChange={handleChange}/>

<button className="bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600">

Signup

</button>

</form>

</div>

</div>

)

}

export default Signup