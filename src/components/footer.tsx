import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">⚖️</span>
              <span className="text-xl font-bold text-gray-900">Legal Aid Connect</span>
            </div>
            <p className="text-gray-600">
              Connecting individuals in need of legal aid with lawyers willing to provide pro bono services.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              For Aid Seekers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/cases/new" className="text-gray-600 hover:text-gray-900">
                  Submit a Case
                </Link>
              </li>
              <li>
                <Link href="/dashboard/seeker" className="text-gray-600 hover:text-gray-900">
                  My Cases
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              For Lawyers
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard/lawyer" className="text-gray-600 hover:text-gray-900">
                  Cases Dashboard
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-600 hover:text-gray-900">
                  Join as Lawyer
                </Link>
              </li>
              <li>
                <Link href="/verification" className="text-gray-600 hover:text-gray-900">
                  Verification Process
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-500 hover:text-gray-900 text-sm">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900 text-sm">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900 text-sm">
                Contact Us
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              © 2024 Legal Aid Connect. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}