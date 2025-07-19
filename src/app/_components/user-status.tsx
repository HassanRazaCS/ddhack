import Link from "next/link";
import { PageHeader } from "./page-header";

interface UserStatusHeaderProps {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      id?: string;
    };
  } | null;
}

export function UserStatusHeader({ session }: UserStatusHeaderProps) {
  if (session?.user) {
    return (
      <PageHeader
        icon="👋"
        title={`Welcome back, ${session.user.name ?? session.user.email}!`}
        subtitle="Ready to make a difference? Start organizing or join an existing movement."
        variant="success"
        size="md"
      />
    );
  }

  return (
    <PageHeader
      icon="🔐"
      title="Join the Movement"
      subtitle="Sign in to start organizing and making your voice heard"
      variant="warning"
      size="md"
    />
  );
}

interface AuthButtonsProps {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      id?: string;
    };
  } | null;
}

export function AuthButtons({ session }: AuthButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link
        href={session ? "/api/auth/signout" : "/login"}
        className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <span className="text-lg">{session ? "👋" : "🔑"}</span>
        {session ? "Sign out" : "Sign in"}
      </Link>
      
      {!session && (
        <Link
          href="/signup"
          className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span className="text-lg">✨</span>
          Create Account
        </Link>
      )}
    </div>
  );
}
