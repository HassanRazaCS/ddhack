import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import VerificationActions from "~/app/_components/verification-actions";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.userType !== "ADMIN") {
    redirect("/dashboard/" + (session.user.userType === "LAWYER" ? "lawyer" : "seeker"));
  }

  // Fetch pending lawyer verifications
  const pendingLawyers = await db.lawyerProfile.findMany({
    where: {
      verificationStatus: "PENDING",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Fetch stats
  const stats = {
    totalLawyers: await db.lawyerProfile.count(),
    pendingVerifications: pendingLawyers.length,
    verifiedLawyers: await db.lawyerProfile.count({
      where: { verificationStatus: "VERIFIED" },
    }),
    rejectedLawyers: await db.lawyerProfile.count({
      where: { verificationStatus: "REJECTED" },
    }),
    totalCases: await db.case.count(),
    activeCases: await db.case.count({
      where: { status: "ACTIVE" },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage lawyer verifications and platform oversight.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{stats.pendingVerifications}</CardTitle>
              <CardDescription>Pending Verifications</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{stats.verifiedLawyers}</CardTitle>
              <CardDescription>Verified Lawyers</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{stats.totalCases}</CardTitle>
              <CardDescription>Total Cases</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{stats.activeCases}</CardTitle>
              <CardDescription>Active Cases</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{stats.rejectedLawyers}</CardTitle>
              <CardDescription>Rejected Applications</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{stats.totalLawyers}</CardTitle>
              <CardDescription>Total Lawyer Profiles</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Pending Verifications */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Lawyer Verifications</CardTitle>
            <CardDescription>
              Review and verify lawyer applications to grant platform access.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingLawyers.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  All Caught Up!
                </h3>
                <p className="text-gray-600">
                  No pending lawyer verifications at this time.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingLawyers.map((lawyer) => (
                  <Card key={lawyer.id} className="border-l-4 border-l-yellow-500">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{lawyer.fullName}</CardTitle>
                          <CardDescription>
                            {lawyer.user.email} • Applied {new Date(lawyer.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                            PENDING
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">License Number</label>
                          <p className="text-gray-900">{lawyer.licenseNumber}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Jurisdiction</label>
                          <p className="text-gray-900">{lawyer.jurisdiction}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Country</label>
                          <p className="text-gray-900">{lawyer.country}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Contact Email</label>
                          <p className="text-gray-900">{lawyer.contactEmail}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Firm</label>
                          <p className="text-gray-900">{lawyer.firmName || "Independent"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Experience</label>
                          <p className="text-gray-900">
                            {lawyer.yearsOfExperience ? `${lawyer.yearsOfExperience} years` : "Not specified"}
                          </p>
                        </div>
                      </div>
                      
                      {lawyer.specializations.length > 0 && (
                        <div className="mb-4">
                          <label className="text-sm font-medium text-gray-700">Specializations</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {lawyer.specializations.map((spec, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {lawyer.languagesSpoken.length > 0 && (
                        <div className="mb-4">
                          <label className="text-sm font-medium text-gray-700">Languages</label>
                          <p className="text-gray-900">{lawyer.languagesSpoken.join(", ")}</p>
                        </div>
                      )}

                      <div className="flex justify-end space-x-3">
                        <VerificationActions lawyerId={lawyer.id} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}