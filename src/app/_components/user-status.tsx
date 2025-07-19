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
    <div className="flex flex-col gap-4 sm:flex-row">
      <Link
        href={session ? "/api/auth/signout" : "/login"}
        className="group relative inline-flex transform items-center gap-2 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-slate-500 hover:to-slate-600 hover:shadow-xl"
      >
        <span className="text-lg">{session ? "👋" : "🔑"}</span>
        {session ? "Sign out" : "Sign in"}
      </Link>

      {!session && (
        <Link
          href="/signup"
          className="group relative inline-flex transform items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-blue-400 hover:to-indigo-400 hover:shadow-xl"
        >
          <span className="text-lg">✨</span>
          Create Account
        </Link>
      )}
    </div>
  );
}
