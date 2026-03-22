import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../api"

function Login(){

const navigate = useNavigate()

const [form,setForm]=useState({
email:"",
password:""
})

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const submit=async(e)=>{
e.preventDefault()

const res=await API.post("/auth/login",form)

localStorage.setItem("token",res.data.token)

navigate("/")
}

return(

<div className="flex items-center justify-center h-screen">

<div className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-2xl font-bold text-center mb-6">Login</h2>

<form onSubmit={submit} className="flex flex-col gap-4">

<input
className="border p-3 rounded-lg"
name="email"
placeholder="Email"
onChange={handleChange}
/>

<input
className="border p-3 rounded-lg"
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
/>

<button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">

Login

</button>

</form>

<p className="text-center mt-4">

No account?

<Link className="text-blue-600" to="/signup"> Signup</Link>

</p>

</div>

</div>

)

}

export default Login