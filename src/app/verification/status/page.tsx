import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function VerificationStatus() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.userType !== "LAWYER") {
    redirect("/dashboard/" + (session.user.userType === "ADMIN" ? "admin" : "seeker"));
  }

  // Fetch lawyer profile
  const lawyerProfile = await db.lawyerProfile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!lawyerProfile) {
    redirect("/dashboard/lawyer");
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          color: "yellow",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          textColor: "text-yellow-800",
          title: "Verification Pending",
          description: "Your application is being reviewed by our admin team.",
          icon: "⏳",
        };
      case "VERIFIED":
        return {
          color: "green",
          bgColor: "bg-green-50",
          borderColor: "border-green-200", 
          textColor: "text-green-800",
          title: "Verified Lawyer",
          description: "Congratulations! You have full access to the platform.",
          icon: "✅",
        };
      case "REJECTED":
        return {
          color: "red",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
          title: "Application Rejected",
          description: "Your application was not approved. Please contact support for more information.",
          icon: "❌",
        };
      default:
        return {
          color: "gray",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-800",
          title: "Unknown Status",
          description: "Please contact support.",
          icon: "❓",
        };
    }
  };

  const statusInfo = getStatusInfo(lawyerProfile.verificationStatus);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Verification Status</h1>
          <p className="text-gray-600 mt-2">
            Track the status of your lawyer verification application.
          </p>
        </div>

        {/* Status Card */}
        <Card className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-l-4`}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{statusInfo.icon}</span>
              <div>
                <CardTitle className={statusInfo.textColor}>{statusInfo.title}</CardTitle>
                <CardDescription className={statusInfo.textColor}>
                  {statusInfo.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Information */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Application Details</CardTitle>
              <CardDescription>
                Information submitted for verification.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <p className="text-gray-900 mt-1">{lawyerProfile.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">License Number</label>
                  <p className="text-gray-900 mt-1">{lawyerProfile.licenseNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Jurisdiction</label>
                  <p className="text-gray-900 mt-1">{lawyerProfile.jurisdiction}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <p className="text-gray-900 mt-1">{lawyerProfile.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Contact Email</label>
                  <p className="text-gray-900 mt-1">{lawyerProfile.contactEmail}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Firm</label>
                  <p className="text-gray-900 mt-1">{lawyerProfile.firmName || "Independent"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Experience</label>
                  <p className="text-gray-900 mt-1">
                    {lawyerProfile.yearsOfExperience ? `${lawyerProfile.yearsOfExperience} years` : "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Application Date</label>
                  <p className="text-gray-900 mt-1">
                    {new Date(lawyerProfile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {lawyerProfile.specializations.length > 0 && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-700">Specializations</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {lawyerProfile.specializations.map((spec, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {lawyerProfile.languagesSpoken.length > 0 && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-700">Languages Spoken</label>
                  <p className="text-gray-900 mt-1">{lawyerProfile.languagesSpoken.join(", ")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              {lawyerProfile.verificationStatus === "PENDING" && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Your application is currently under review. Our admin team will verify your credentials with the relevant bar association. 
                    This process typically takes 2-5 business days.
                  </p>
                  <div className="flex space-x-4">
                    <Link href="/verification/requirements">
                      <Button variant="secondary">View Requirements</Button>
                    </Link>
                    <Link href="/dashboard/lawyer">
                      <Button>Back to Dashboard</Button>
                    </Link>
                  </div>
                </div>
              )}

              {lawyerProfile.verificationStatus === "VERIFIED" && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Welcome to Legal Aid Connect! You now have full access to browse cases and offer pro bono services.
                  </p>
                  <Link href="/dashboard/lawyer">
                    <Button>Go to Cases Dashboard</Button>
                  </Link>
                </div>
              )}

              {lawyerProfile.verificationStatus === "REJECTED" && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Your application was not approved. This may be due to incomplete information or verification issues. 
                    Please contact our support team for more details and guidance on reapplying.
                  </p>
                  <div className="flex space-x-4">
                    <a href="mailto:verification@legalaidconnect.org">
                      <Button variant="secondary">Contact Support</Button>
                    </a>
                    <Link href="/dashboard/lawyer">
                      <Button>Back to Dashboard</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}