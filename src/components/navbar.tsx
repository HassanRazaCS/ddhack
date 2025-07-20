"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

// Assuming Newsreader font is imported globally via CSS, e.g., in globals.css:
// @import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@400;700&display=swap');
// Then you can apply a class like 'font-newsreader' and define it in globals.css:
// .font-newsreader {
//   font-family: 'Newsreader', serif;
// }

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 right-0 left-0 z-10 flex items-center justify-between bg-white p-4 font-['Newsreader'] shadow-sm">
      {/* Left side: Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold">Advocado</span>
        </Link>
      </div>

      {/* Middle: Centered Navigation Links */}
      {/* This div will grow to take available space and center its children */}
      <div className="flex flex-1 items-center justify-center">
        {status === "loading" ? (
          <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div> // Placeholder for loading
        ) : session?.user ? (
          // Authenticated user navigation
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>

            {session.user.userType === "SEEKER" ? (
              <>
                <Link
                  href="/dashboard/seeker"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  My Cases
                </Link>
                {/* Create Case button typically on the right or part of dropdown */}
                {/* For now, keeping it here for functionality, but might need design adjustment */}
              </>
            ) : session.user.userType === "LAWYER" ? (
              <Link
                href="/dashboard/lawyer"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Cases Dashboard
              </Link>
            ) : (
              <Link
                href="/admin"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Admin Dashboard
              </Link>
            )}

            <Link
              href="/know-your-rights"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Know your rights
            </Link>
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
          </div>
        ) : (
          // Unauthenticated user navigation
          <nav className="space-x-16">
            <Link
              href="/know-your-rights"
              className="font-bold text-gray-600 hover:text-gray-900"
            >
              Know your rights
            </Link>
            <Link
              href="#"
              className="font-bold text-gray-600 hover:text-gray-900"
            >
              Find a lawyer
            </Link>
            <Link
              href="/about"
              className="font-bold text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
          </nav>
        )}
      </div>

      {/* Right side: User info or Login button */}
      <div className="flex items-center space-x-4">
        {status === "loading" ? null : session?.user ? ( // Loading state handled in the middle section, so this could be empty or a different loading indicator
          <div className="flex items-center space-x-3">
            {session.user.userType === "SEEKER" && ( // Put Create Case button on the right for seeker
              <Link href="/cases/new">
                <Button
                  style={{ backgroundColor: "#68D466" }}
                  className="rounded px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Create Case
                </Button>
              </Link>
            )}
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <span className="text-sm font-medium text-white">
                  {session.user.name?.charAt(0)?.toUpperCase() ?? "U"}
                </span>
              </div>
              <span className="text-sm text-gray-700">{session.user.name}</span>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                {session.user.userType === "SEEKER"
                  ? "Aid Seeker"
                  : session.user.userType === "LAWYER"
                    ? "Lawyer"
                    : "Admin"}
              </span>
            </div>
            <Button variant="secondary" size="sm" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button
              style={{ backgroundColor: "#68D466" }}
              className="rounded px-4 py-2 text-white hover:bg-green-700"
            >
              Log in
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
