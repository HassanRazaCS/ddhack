import { type NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

interface VerifyLawyerRequest {
  lawyerId: string;
  action: "VERIFIED" | "REJECTED";
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

    if (session.user.userType !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json() as VerifyLawyerRequest;
    const { lawyerId, action } = body;

    if (!lawyerId || !action) {
      return NextResponse.json(
        { error: "Lawyer ID and action are required" },
        { status: 400 }
      );
    }

    if (!["VERIFIED", "REJECTED"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be VERIFIED or REJECTED" },
        { status: 400 }
      );
    }

    // Update the lawyer's verification status
    const updatedLawyer = await db.lawyerProfile.update({
      where: {
        id: lawyerId,
      },
      data: {
        verificationStatus: action,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Log the verification action (you could extend this to save audit logs)
    console.log(`Admin ${session.user.email} ${action.toLowerCase()} lawyer ${updatedLawyer.user.email} (${updatedLawyer.fullName})`);

    return NextResponse.json(
      { 
        message: `Lawyer ${action.toLowerCase()} successfully`,
        lawyer: updatedLawyer 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lawyer verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}