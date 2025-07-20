import SignupForm from "~/app/_components/signup-form";
import Link from "next/link";
import { Card } from "~/components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Advocado</h1>
          <p className="text-gray-600 mt-2">Join our community</p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <Card className="px-8 py-8">
          <SignupForm />
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
