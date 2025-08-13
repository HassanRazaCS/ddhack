import Image from "next/image";
import Link from "next/link";
import LoginForm from "~/app/_components/login-form";
import { Card } from "~/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center space-x-3">
            <Image
              src="/logo.svg"
              alt="Advocado"
              width={40}
              height={46}
              className="h-10 w-auto"
            />
            <h1 className="text-3xl font-bold text-gray-900">Advocado</h1>
          </div>
          <p className="mt-2 text-gray-600">Welcome back</p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-8 py-8">
          <LoginForm />
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
