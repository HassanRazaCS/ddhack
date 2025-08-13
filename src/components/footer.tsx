import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <Image
                src="/logo.svg"
                alt="Advocado"
                width={32}
                height={37}
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">Advocado</span>
            </div>
            <p className="text-gray-600">
              Connecting individuals in need of legal aid with lawyers willing
              to provide pro bono services.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase">
              For Aid Seekers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/cases/new"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Submit a Case
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/seeker"
                  className="text-gray-600 hover:text-gray-900"
                >
                  My Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase">
              For Lawyers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/dashboard/lawyer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Cases Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Join as Lawyer
                </Link>
              </li>
              <li>
                <Link
                  href="/verification"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Verification Process
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Contact Us
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500 md:mt-0">
              {new Date().getFullYear()} Advocado. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
