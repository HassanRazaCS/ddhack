import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import { ZodError } from "zod";

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  userType?: "SEEKER" | "LAWYER";
  fullName?: string;
  licenseNumber?: string;
  jurisdiction?: string;
  country?: string;
  contactEmail?: string;
  firmName?: string;
  specializations?: string[];
  yearsOfExperience?: number | null;
  languagesSpoken?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as SignupRequest;
    const { 
      name, 
      email, 
      password, 
      userType = "SEEKER", 
      fullName, 
      licenseNumber, 
      jurisdiction, 
      country, 
      contactEmail, 
      firmName,
      specializations = [],
      yearsOfExperience,
      languagesSpoken = []
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (userType && !["SEEKER", "LAWYER"].includes(userType)) {
      return NextResponse.json(
        { error: "Invalid user type" },
        { status: 400 }
      );
    }

    if (userType === "LAWYER") {
      if (!fullName || !licenseNumber || !jurisdiction || !country || !contactEmail) {
        return NextResponse.json(
          { error: "Lawyer registration requires full name, license number, jurisdiction, country, and contact email" },
          { status: 400 }
        );
      }
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        userType: true,
      },
    });

    // If user is a lawyer, create lawyer profile
    if (userType === "LAWYER" && fullName && licenseNumber && jurisdiction && country && contactEmail) {
      await db.lawyerProfile.create({
        data: {
          userId: user.id,
          fullName,
          licenseNumber,
          jurisdiction,
          country,
          contactEmail,
          firmName: firmName ?? null,
          specializations,
          yearsOfExperience,
          languagesSpoken,
        },
      });
    }

    return NextResponse.json(
      { user, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
