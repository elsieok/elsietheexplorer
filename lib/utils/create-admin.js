import connectMongoDB from "../db/connectMongoDB.js"
import User from "../models/user.model.js"
import dotenv from "dotenv"
dotenv.config({ path: '.env.local' })

// this node.js script is ran as a standalone and so is not involved in next.js server
async function createAdmin() {
  await connectMongoDB()

  const adminData = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: 'admin'
  }

  try {
    const existingAdmin = await User.findOne({ email: adminData.email })
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    const admin = new User(adminData)
    await admin.save()
    
    console.log('Admin user created successfully!')
    console.log(`Email: ${adminData.email}`)
  } catch (error) {
    console.error('Failed to create admin:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

createAdmin()