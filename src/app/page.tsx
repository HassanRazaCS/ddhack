import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  // Redirect authenticated users to their dashboard
  if (session?.user) {
    if (session.user.userType === "LAWYER") {
      redirect("/dashboard/lawyer");
    } else if (session.user.userType === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/dashboard/seeker");
    }
  }

  return (
    // Apply background color and font directly
    <div className="bg-[#f6f6ed] font-['Newsreader']">
      <section className="flex items-center justify-center pt-64 pb-72">
        {/* Added px for consistency */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-800 md:text-6xl lg:text-7xl">
            Connecting legal needs with pro bono professionals.
          </h1>
          <p className="max-w-7xl text-xl text-gray-700">
            Bridging the justice gap by connecting individuals who need legal
            assistance with lawyers willing to provide pro bono services.
          </p>
        </div>
      </section>

      <hr className="mx-auto max-w-7xl border-gray-300" />

      {/* How It Works Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              How it works
            </h2>
            <p className="max-w-xl text-xl text-gray-600">
              Our simple process connects those in need with legal professionals
              ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Submit Your Case Card */}
            {/* Changed structure to use CardContent for the main content area,
                removed flex-col items-start from Card to rely on Shadcn's internal layout for width. */}
            <Card className="rounded-lg bg-white">
              {" "}
              {/* Kept bg-white and rounded-lg */}
              <CardContent className="p-6">
                {" "}
                {/* Added CardContent with padding */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e1f6e0]">
                  <span className="pt-1 text-3xl">📝</span>
                </div>
                <CardTitle className="mb-2 text-xl font-semibold text-gray-900">
                  Submit Your Case
                </CardTitle>
                <CardDescription className="text-left text-base text-gray-600">
                  Create a detailed description of your legal issue and the type
                  of assistance you need.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Lawyers Review Card */}
            <Card className="rounded-lg bg-white">
              <CardContent className="p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e1f6e0]">
                  <span className="pt-1 text-3xl">🔍</span>
                </div>
                <CardTitle className="mb-2 text-xl font-semibold text-gray-900">
                  Lawyers Review
                </CardTitle>
                <CardDescription className="text-left text-base text-gray-600">
                  Verified legal professionals review available cases and
                  express interest in those they can help with.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Get Connected Card */}
            <Card className="rounded-lg bg-white">
              <CardContent className="p-6">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e1f6e0]">
                  <span className="pt-1 text-3xl">🤝</span>
                </div>
                <CardTitle className="mb-2 text-xl font-semibold text-gray-900">
                  Get Connected
                </CardTitle>
                <CardDescription className="text-left text-base text-gray-600">
                  Receive contact information from interested lawyers and
                  connect directly to discuss your case.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <hr className="mx-auto max-w-7xl border-gray-300" />

      <section className="py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              For those Seeking Legal Aid
            </h2>
            <div className="space-y-12">
              <div className="flex items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Free Case Submission
                  </h3>
                  <p className="text-gray-600">
                    Submit your legal case details at no cost and reach
                    qualified attorneys willing to help.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Know Your Rights
                  </h3>
                  <p className="text-gray-600">
                    Access comprehensive legal rights information for protests
                    and police interactions across different countries.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Track Your Cases
                  </h3>
                  <p className="text-gray-600">
                    Monitor the status of your submissions and manage
                    communications with interested lawyers through your
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              For Legal Professionals
            </h2>
            <div className="space-y-12">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Browse Available Cases
                  </h3>
                  <p className="text-gray-600">
                    Review cases that match your expertise and choose which ones
                    you&apos;d like to take on pro bono.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Verified Professional Status
                  </h3>
                  <p className="text-gray-600">
                    Join our network of verified lawyers and build your pro bono
                    portfolio while helping those in need.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Manage Your Caseload
                  </h3>
                  <p className="text-gray-600">
                    Track your active pro bono cases and communicate directly
                    with clients through your lawyer dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
