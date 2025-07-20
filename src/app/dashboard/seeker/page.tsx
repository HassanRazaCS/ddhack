import Link from "next/link";
import { redirect } from "next/navigation";
import { CaseCard } from "~/app/_components/case-card";
import { SuccessBanner } from "~/app/_components/success-banner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function SeekerDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.userType !== "SEEKER") {
    redirect("/dashboard/lawyer");
  }

  // Fetch user's cases
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
      interests: {
        select: {
          lawyerId: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const activeCases = cases.filter((c) => c.status === "ACTIVE").length;
  const inReviewCases = cases.filter((c) => c.status === "IN_REVIEW").length;
  const closedCases = cases.filter((c) => c.status === "CLOSED").length;
  const totalInterests = cases.reduce((sum, c) => sum + c._count.interests, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Cases</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session.user.name}. Manage your legal aid requests
            and connect with pro bono lawyers.
          </p>
        </div>

        {/* Success Message for New Case */}
        <SuccessBanner />

        {/* Create Case CTA */}
        <div className="mb-8">
          <Card className="border-l-4 border-l-blue-500 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">
                Need Legal Assistance?
              </CardTitle>
              <CardDescription className="text-blue-700">
                Submit a new case to connect with qualified pro bono lawyers who
                can help with your legal needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/cases/new">
                <Button variant="default">📝 Create New Case</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* My Cases */}
            <Card>
              <CardHeader>
                <CardTitle>My Cases</CardTitle>
                <CardDescription>
                  Track the status of your legal aid requests and view
                  interested lawyers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cases.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                      No Cases Yet
                    </h3>
                    <p className="mb-4 text-gray-600">
                      You haven&apos;t submitted any legal aid requests yet.
                      Create your first case to get started.
                    </p>
                    <Link href="/cases/new">
                      <Button>Create Your First Case</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cases.map((caseData) => (
                      <CaseCard
                        key={caseData.id}
                        case={caseData}
                        userType="SEEKER"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Updates on your cases and lawyer interactions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center">
                  <p className="text-gray-500">No recent activity</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Case Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Case Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {activeCases}
                    </p>
                    <p className="text-sm text-gray-600">Active Cases</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {totalInterests}
                    </p>
                    <p className="text-sm text-gray-600">Lawyer Responses</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {inReviewCases}
                    </p>
                    <p className="text-sm text-gray-600">In Review</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {closedCases}
                    </p>
                    <p className="text-sm text-gray-600">Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help & Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Help & Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/about">
                  <Button variant="secondary" className="w-full justify-start">
                    ❓ How It Works
                  </Button>
                </Link>
                <a href="mailto:support@legalaidconnect.org">
                  <Button variant="secondary" className="w-full justify-start">
                    📞 Contact Support
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>💡 Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <strong>Be detailed:</strong> The more information you
                    provide about your case, the better lawyers can assess if
                    they can help.
                  </p>
                  <p>
                    <strong>Respond quickly:</strong> When lawyers express
                    interest, respond promptly to maintain momentum.
                  </p>
                  <p>
                    <strong>Stay organized:</strong> Keep all case documents and
                    communications in one place.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
