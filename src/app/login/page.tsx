import LoginForm from "~/app/_components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LoginForm />
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
  );
}
