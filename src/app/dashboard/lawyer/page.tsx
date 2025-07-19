import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default async function LawyerDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.userType !== "LAWYER") {
    redirect("/dashboard/seeker");
  }

  // Fetch lawyer profile to get actual verification status
  const lawyerProfile = await db.lawyerProfile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!lawyerProfile) {
    redirect("/dashboard/seeker");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lawyer Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session.user.name}. Review available cases and offer your pro bono services.
          </p>
        </div>

        {/* Verification Status Banner */}
        <div className="mb-8">
          {lawyerProfile.verificationStatus === "PENDING" && (
            <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">Account Verification</CardTitle>
                <CardDescription className="text-yellow-700">
                  Your account is currently under review. Once verified, you&apos;ll have full access to browse and respond to cases.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-yellow-800">Verification Pending</span>
                  </div>
                  <Link href="/verification/requirements">
                    <Button variant="secondary" size="sm">
                      View Verification Requirements
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {lawyerProfile.verificationStatus === "VERIFIED" && (
            <Card className="border-l-4 border-l-green-500 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Account Verified ✅</CardTitle>
                <CardDescription className="text-green-700">
                  Congratulations! Your professional credentials have been verified. You now have full access to browse and respond to cases.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Verified Lawyer</span>
                  </div>
                  <Link href="/cases/browse">
                    <Button variant="secondary" size="sm">
                      Browse Cases
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {lawyerProfile.verificationStatus === "REJECTED" && (
            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">Application Rejected</CardTitle>
                <CardDescription className="text-red-700">
                  Your verification application was not approved. Please contact support for more information and guidance on reapplying.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-800">Application Rejected</span>
                  </div>
                  <a href="mailto:verification@legalaidconnect.org">
                    <Button variant="secondary" size="sm">
                      Contact Support
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Available Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Available Cases</CardTitle>
                <CardDescription>
                  Pro bono legal cases seeking assistance. Filter by your areas of expertise.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lawyerProfile.verificationStatus === "VERIFIED" ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚖️</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Cases Available
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Browse available pro bono cases and express your interest in helping those in need.
                    </p>
                    <Link href="/cases/browse">
                      <Button>Browse Available Cases</Button>
                    </Link>
                  </div>
                ) : lawyerProfile.verificationStatus === "PENDING" ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚖️</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Complete Your Verification
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Once your professional credentials are verified, you&apos;ll be able to browse and respond to cases.
                    </p>
                    <Link href="/verification/status">
                      <Button>Check Verification Status</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">❌</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Verification Required
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your verification application was not approved. Please contact support for assistance.
                    </p>
                    <a href="mailto:verification@legalaidconnect.org">
                      <Button>Contact Support</Button>
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Case Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Case Filters</CardTitle>
                <CardDescription>
                  Set your preferences for receiving case notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Legal Categories
                    </label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>All Categories</option>
                      <option>Family Law</option>
                      <option>Immigration Law</option>
                      <option>Criminal Defense</option>
                      <option>Employment Law</option>
                      <option>Housing Law</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jurisdiction
                    </label>
                    <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>All Jurisdictions</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <div className="flex items-center space-x-2 mt-1">
                    {lawyerProfile.verificationStatus === "VERIFIED" && (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-700">Verified</span>
                      </>
                    )}
                    {lawyerProfile.verificationStatus === "PENDING" && (
                      <>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-yellow-700">Verification Pending</span>
                      </>
                    )}
                    {lawyerProfile.verificationStatus === "REJECTED" && (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-700">Application Rejected</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Cases Taken</label>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Hours Contributed</label>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/verification/status">
                  <Button variant="secondary" className="w-full justify-start">
                    📋 Check Verification Status
                  </Button>
                </Link>
                <Link href="/verification/requirements">
                  <Button variant="secondary" className="w-full justify-start">
                    📖 View Requirements
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}