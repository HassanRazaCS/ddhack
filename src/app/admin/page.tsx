import { redirect } from "next/navigation";
import VerificationActions from "~/app/_components/verification-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.userType !== "ADMIN") {
    redirect(
      "/dashboard/" +
        (session.user.userType === "LAWYER" ? "lawyer" : "seeker"),
    );
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage lawyer verifications and platform oversight.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {stats.pendingVerifications}
              </CardTitle>
              <CardDescription>Pending Verifications</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                {stats.verifiedLawyers}
              </CardTitle>
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
              <CardTitle className="text-2xl">
                {stats.rejectedLawyers}
              </CardTitle>
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
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  All Caught Up!
                </h3>
                <p className="text-gray-600">
                  No pending lawyer verifications at this time.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingLawyers.map((lawyer) => (
                  <Card
                    key={lawyer.id}
                    className="border-l-4 border-l-yellow-500"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {lawyer.fullName}
                          </CardTitle>
                          <CardDescription>
                            {lawyer.user.email} • Applied{" "}
                            {new Date(lawyer.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                            PENDING
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            License Number
                          </label>
                          <p className="text-gray-900">
                            {lawyer.licenseNumber}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Jurisdiction
                          </label>
                          <p className="text-gray-900">{lawyer.jurisdiction}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <p className="text-gray-900">{lawyer.country}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Contact Email
                          </label>
                          <p className="text-gray-900">{lawyer.contactEmail}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Firm
                          </label>
                          <p className="text-gray-900">
                            {lawyer.firmName ?? "Independent"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">
                            Experience
                          </label>
                          <p className="text-gray-900">
                            {lawyer.yearsOfExperience
                              ? `${lawyer.yearsOfExperience} years`
                              : "Not specified"}
                          </p>
                        </div>
                      </div>

                      {lawyer.specializations.length > 0 && (
                        <div className="mb-4">
                          <label className="text-sm font-medium text-gray-700">
                            Specializations
                          </label>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {lawyer.specializations.map((spec, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {lawyer.languagesSpoken.length > 0 && (
                        <div className="mb-4">
                          <label className="text-sm font-medium text-gray-700">
                            Languages
                          </label>
                          <p className="text-gray-900">
                            {lawyer.languagesSpoken.join(", ")}
                          </p>
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
