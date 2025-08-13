import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { CaseCard } from "~/app/_components/case-card";
import Link from "next/link";
import { CaseFilters } from "~/app/_components/case-filters";

export default async function BrowseCases({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.userType !== "LAWYER") {
    redirect("/dashboard/seeker");
  }

  // Verify lawyer is verified
  const lawyerProfile = await db.lawyerProfile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!lawyerProfile || lawyerProfile.verificationStatus !== "VERIFIED") {
    redirect("/dashboard/lawyer");
  }

  const { legalCategory, urgencyLevel, country } = searchParams;

  // Fetch available cases
  const cases = await db.case.findMany({
    where: {
      status: "ACTIVE",
      ...(legalCategory &&
        legalCategory !== "ALL" && { legalCategory: legalCategory }),
      ...(urgencyLevel &&
        urgencyLevel !== "ALL" && { urgencyLevel: urgencyLevel }),
      ...(country && country !== "ALL" && { country: country }),
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Browse Cases
              </h1>
              <p className="mt-2 text-gray-600">
                Find pro bono legal cases that match your expertise and help
                those in need.
              </p>
            </div>
            <Link href="/dashboard/lawyer">
              <Button variant="secondary" className="w-full sm:w-auto">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <CaseFilters />
        </div>

        {/* Cases List */}
        <div className="space-y-6">
          {cases.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    No Cases Available
                  </h3>
                  <p className="mb-4 text-gray-600">
                    There are currently no active cases seeking legal
                    assistance. Check back later or adjust your filters.
                  </p>
                  <Link href="/dashboard/lawyer">
                    <Button variant="secondary">Back to Dashboard</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {cases.length} {cases.length === 1 ? "Case" : "Cases"}{" "}
                  Available
                </h2>
                <div className="text-sm text-gray-600">
                  Showing all active cases
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {cases.map((caseData) => (
                  <CaseCard
                    key={caseData.id}
                    case={caseData}
                    userType="LAWYER"
                    lawyerId={lawyerProfile.id}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>💡 Tips for Pro Bono Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 text-sm text-gray-600 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Choosing Cases
                  </h4>
                  <ul className="space-y-1">
                    <li>• Select cases within your areas of expertise</li>
                    <li>• Consider the time commitment required</li>
                    <li>• Review the urgency level and your availability</li>
                    <li>• Check jurisdiction matches your license</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Best Practices
                  </h4>
                  <ul className="space-y-1">
                    <li>• Respond promptly to case interests</li>
                    <li>• Be clear about what help you can provide</li>
                    <li>• Maintain professional communication</li>
                    <li>• Set realistic expectations with clients</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
