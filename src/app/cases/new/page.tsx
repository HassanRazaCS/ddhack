import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import CaseCreationForm from "~/app/_components/case-creation-form";

export default async function NewCasePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.userType !== "SEEKER") {
    redirect("/dashboard/lawyer");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Case</h1>
          <p className="text-gray-600 mt-2">
            Provide details about your legal issue to connect with qualified pro bono lawyers.
          </p>
        </div>

        <CaseCreationForm />
      </div>
    </div>
  );
}