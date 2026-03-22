import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

function Navbar(){

const navigate = useNavigate()
const [isLoggedIn, setIsLoggedIn] = useState(false)

useEffect(() => {

  const user = localStorage.getItem("user")
  setIsLoggedIn(!!user)

}, [])

const handleLogout = () => {

  localStorage.removeItem("user")
  setIsLoggedIn(false)

  navigate("/auth/login")

}

return(

<nav className="bg-blue-600 text-white px-8 py-4 shadow-md flex justify-between">

<h1 className="text-xl font-bold">ParkMatix</h1>

<div className="flex gap-6">

<Link className="hover:text-gray-200" to="/">Home</Link>

{!isLoggedIn ? (

<>
<Link className="hover:text-gray-200" to="/login">
Login
</Link>

<Link className="hover:text-gray-200" to="/signup">
Sign Up
</Link>
</>

) : (

<button
onClick={handleLogout}
className="hover:text-gray-200"
>
Logout
</button>

)}

</div>

</nav>

)

}

export default Navbar