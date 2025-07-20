import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { CaseCard } from "~/app/_components/case-card";
import Link from "next/link";

export default async function BrowseCases() {
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

  // Fetch available cases
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Browse Cases</h1>
              <p className="text-gray-600 mt-2">
                Find pro bono legal cases that match your expertise and help those in need.
              </p>
            </div>
            <Link href="/dashboard/lawyer">
              <Button variant="secondary">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Filter Cases</CardTitle>
              <CardDescription>
                Filter cases by category, urgency, and location to find matches for your expertise.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Category
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Categories</option>
                    <option>Family Law</option>
                    <option>Immigration Law</option>
                    <option>Criminal Defense</option>
                    <option>Employment Law</option>
                    <option>Housing Law</option>
                    <option>Civil Rights</option>
                    <option>Consumer Protection</option>
                    <option>Disability Rights</option>
                    <option>Elder Law</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Levels</option>
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                    <option>URGENT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Countries</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cases List */}
        <div className="space-y-6">
          {cases.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Cases Available
                  </h3>
                  <p className="text-gray-600 mb-4">
                    There are currently no active cases seeking legal assistance. Check back later or adjust your filters.
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
                  {cases.length} {cases.length === 1 ? 'Case' : 'Cases'} Available
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Choosing Cases</h4>
                  <ul className="space-y-1">
                    <li>• Select cases within your areas of expertise</li>
                    <li>• Consider the time commitment required</li>
                    <li>• Review the urgency level and your availability</li>
                    <li>• Check jurisdiction matches your license</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Best Practices</h4>
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