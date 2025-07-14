import { db } from "~/server/db";
import bcrypt from "bcryptjs";

async function createTestUser() {
  try {
    const hashedPassword = await bcrypt.hash("password123", 12);
    
    const user = await db.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: hashedPassword,
      },
    });
    
    console.log("✅ Test user created successfully!");
    console.log("📧 Email: test@example.com");
    console.log("🔑 Password: password123");
    console.log("🌐 Login at: http://localhost:3000/login");
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log("ℹ️  Test user already exists");
      console.log("📧 Email: test@example.com");
      console.log("🔑 Password: password123");
    } else {
      console.error("❌ Error creating user:", error.message);
    }
  }
}

createTestUser();
