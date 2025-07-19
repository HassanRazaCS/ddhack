import { type NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

interface CreateCaseRequest {
  title: string;
  description: string;
  legalCategory: string;
  jurisdiction: string;
  country: string;
  urgencyLevel: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  preferredLanguage?: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (session.user.userType !== "SEEKER") {
      return NextResponse.json(
        { error: "Only aid seekers can create cases" },
        { status: 403 }
      );
    }

    const body = await request.json() as CreateCaseRequest;
    const { title, description, legalCategory, jurisdiction, country, urgencyLevel, preferredLanguage } = body;

    // Validation
    if (!title || !description || !legalCategory || !jurisdiction || !country) {
      return NextResponse.json(
        { error: "Title, description, legal category, jurisdiction, and country are required" },
        { status: 400 }
      );
    }

    if (!["LOW", "MEDIUM", "HIGH", "URGENT"].includes(urgencyLevel)) {
      return NextResponse.json(
        { error: "Invalid urgency level" },
        { status: 400 }
      );
    }

    // Create the case
    const newCase = await db.case.create({
      data: {
        seekerId: session.user.id,
        title,
        description,
        legalCategory,
        jurisdiction,
        country,
        urgencyLevel,
        preferredLanguage: preferredLanguage ?? null,
      },
      include: {
        seeker: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            interests: true,
          },
        },
      },
    });

    return NextResponse.json(
      { case: newCase, message: "Case created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Case creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // const { searchParams } = new URL(request.url); // Future use for filtering
    const userType = session.user.userType;

    if (userType === "SEEKER") {
      // Return cases created by this seeker
      const cases = await db.case.findMany({
        where: {
          seekerId: session.user.id,
        },
        include: {
          _count: {
            select: {
              interests: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json({ cases });
    } else if (userType === "LAWYER") {
      // Return all active cases for lawyers to browse
      const cases = await db.case.findMany({
        where: {
          status: "ACTIVE",
        },
        include: {
          seeker: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              interests: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json({ cases });
    }

    return NextResponse.json(
      { error: "Invalid user type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Cases fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}