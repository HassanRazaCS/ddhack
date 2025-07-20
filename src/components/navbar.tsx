"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Advocado"
                width={32}
                height={37}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">Advocado</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {status === "loading" ? (
              <div className="h-8 w-8 animate-pulse rounded bg-gray-200"></div>
            ) : (
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              {session?.user ? (
                <>
                  {/* User info section */}
                  <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                      <span className="text-sm font-medium text-white">
                        {session.user.name?.charAt(0)?.toUpperCase() ?? "U"}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {session.user.userType === "SEEKER"
                          ? "Aid Seeker"
                          : session.user.userType === "LAWYER"
                            ? "Lawyer"
                            : "Admin"}
                      </div>
                    </div>
                  </div>

                  {/* Navigation links */}
                  {session.user.userType === "SEEKER" ? (
                    <>
                      <Link
                        href="/dashboard/seeker"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Cases
                      </Link>
                      <Link
                        href="/cases/new"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Create Case
                      </Link>
                    </>
                  ) : session.user.userType === "LAWYER" ? (
                    <Link
                      href="/dashboard/lawyer"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Cases Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/admin"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/know-your-rights"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Know Your Rights
                  </Link>
                  <Link
                    href="/about"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>

                  {/* Sign out button */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      void signOut();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/know-your-rights"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Know Your Rights
                  </Link>
                  <Link
                    href="/about"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>

                  {/* Auth buttons */}
                  <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
                    <Link
                      href="/login"
                      className="block w-full text-center px-3 py-2 border border-gray-300 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full text-center px-3 py-2 bg-blue-600 text-white rounded-md text-base font-medium hover:bg-blue-700"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
