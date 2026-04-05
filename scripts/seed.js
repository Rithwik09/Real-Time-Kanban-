import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../src/models/user.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB");

    // Clear existing users
    await User.deleteMany({});
    console.log("✓ Cleared existing users");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const adminUser = await User.create({
      email: "admin@example.com",
      password: adminPassword,
      role: "admin"
    });
    console.log("✓ Admin user created:", adminUser.email);

    // Create normal users
    const userPassword = await bcrypt.hash("user123", 10);
    const user1 = await User.create({
      email: "user1@example.com",
      password: userPassword,
      role: "user"
    });
    console.log("✓ User 1 created:", user1.email);

    const user2 = await User.create({
      email: "user2@example.com",
      password: userPassword,
      role: "user"
    });
    console.log("✓ User 2 created:", user2.email);

    const user3 = await User.create({
      email: "user3@example.com",
      password: userPassword,
      role: "user"
    });
    console.log("✓ User 3 created:", user3.email);

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📝 Test Credentials:");
    console.log("─".repeat(40));
    console.log("Admin:");
    console.log("  Email: admin@example.com");
    console.log("  Password: admin123");
    console.log("\nNormal Users:");
    console.log("  Email: user1@example.com / user2@example.com / user3@example.com");
    console.log("  Password: user123");
    console.log("─".repeat(40));

    // Disconnect
    await mongoose.connection.close();
    console.log("\n✓ Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
