import AuthUser from "../models/authUser.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body

    const existingUser = await AuthUser.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new AuthUser({
      name,
      email,
      password: hashedPassword
    })

    await user.save()

    res.json({
      message: "User registered successfully"
    })

  } catch (err) {
    res.status(500).json(err)
  }

}


export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await AuthUser.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      message: "Login successful",
      token
    })

  } catch (err) {
    res.status(500).json(err)
  }

}