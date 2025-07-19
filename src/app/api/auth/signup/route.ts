import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import { ZodError } from "zod";

import { signupSchema } from "~/server/auth/schemas";

export async function POST(request: NextRequest) {
  try {
    const reqBody: unknown = await request.json();
    const { name, email, password } = signupSchema.parse(reqBody);

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
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
      },
    });

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
