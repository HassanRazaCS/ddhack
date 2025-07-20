"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">⚖️</span>
              <span className="text-xl font-bold text-gray-900">Advocado</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
            ) : session?.user ? (
              <>
                <div className="flex items-center space-x-4">
                  {session.user.userType === "SEEKER" ? (
                    <>
                      <Link
                        href="/dashboard/seeker"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        My Cases
                      </Link>
                      <Button asChild size="sm">
                        <Link href="/cases/new">Create Case</Link>
                      </Button>
                    </>
                  ) : session.user.userType === "LAWYER" ? (
                    <Link
                      href="/dashboard/lawyer"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Cases Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/admin"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/know-your-rights"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Know Your Rights
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    About
                  </Link>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                      <span className="text-sm font-medium text-white">
                        {session.user.name?.charAt(0)?.toUpperCase() ?? "U"}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">
                      {session.user.name}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      {session.user.userType === "SEEKER"
                        ? "Aid Seeker"
                        : session.user.userType === "LAWYER"
                          ? "Lawyer"
                          : "Admin"}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
                <Link
                  href="/know-your-rights"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Know Your Rights
                </Link>
                <Link
                  href="/about"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  About
                </Link>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
