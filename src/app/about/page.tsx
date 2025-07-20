import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Advocado
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the justice gap by connecting individuals who need legal assistance 
            with lawyers willing to provide pro bono services worldwide.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Advocado was founded on the belief that access to justice should not be determined by one&apos;s ability to pay. 
              We serve as a bridge between individuals facing legal challenges and qualified legal professionals who are committed 
              to providing pro bono services. Our platform facilitates meaningful connections that help resolve legal issues while 
              fostering a global community of legal professionals dedicated to social justice.
            </p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Submit Your Case</h3>
                <p className="text-gray-600 text-sm">
                  Aid seekers create detailed descriptions of their legal issues, including case type, urgency, and location.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Lawyer Review</h3>
                <p className="text-gray-600 text-sm">
                  Verified lawyers browse cases by category, location, and their areas of expertise to find matches.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Connect & Collaborate</h3>
                <p className="text-gray-600 text-sm">
                  When lawyers express interest, direct communication is established to discuss case details and next steps.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Reach */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Global Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              Advocado operates globally, supporting legal systems and jurisdictions worldwide. Our platform 
              accommodates lawyers licensed in any country or region, from common law systems like the United States, 
              Canada, and the United Kingdom, to civil law systems across Europe, and legal frameworks in developing nations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="font-semibold text-gray-900">🇺🇸 Americas</p>
                <p className="text-sm text-gray-600">USA, Canada, Mexico, Brazil</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">🇪🇺 Europe</p>
                <p className="text-sm text-gray-600">EU, UK, Switzerland, Norway</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">🌏 Asia-Pacific</p>
                <p className="text-sm text-gray-600">Australia, Japan, India, Singapore</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">🌍 Global</p>
                <p className="text-sm text-gray-600">Africa, Middle East, Others</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🎯 Access to Justice</h4>
                <p className="text-gray-700 text-sm">
                  We believe everyone deserves access to legal representation, regardless of their financial situation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🛡️ Professional Integrity</h4>
                <p className="text-gray-700 text-sm">
                  All lawyers undergo verification to ensure they are licensed professionals committed to ethical practice.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🌐 Global Community</h4>
                <p className="text-gray-700 text-sm">
                  We foster connections across borders, creating a worldwide network of legal professionals serving those in need.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">💡 Innovation</h4>
                <p className="text-gray-700 text-sm">
                  We leverage technology to make legal aid more accessible, efficient, and effective for everyone involved.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Lawyer Verification</CardTitle>
            <CardDescription>
              Ensuring trust and professional standards in our community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">License Verification</h4>
                  <p className="text-gray-600 text-sm">
                    We verify professional licenses with relevant bar associations and legal regulatory bodies.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Professional Standing</h4>
                  <p className="text-gray-600 text-sm">
                    We confirm lawyers are in good standing with no disciplinary actions that would impact their practice.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Expertise Areas</h4>
                  <p className="text-gray-600 text-sm">
                    We validate declared areas of legal specialization to ensure appropriate case matching.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Get Involved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you&apos;re seeking legal assistance or want to contribute your legal expertise to help others, 
              Advocado welcomes you to join our growing global community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Need Legal Help?</h4>
                <p className="text-blue-700 text-sm mb-3">
                  Submit your case and connect with qualified pro bono lawyers.
                </p>
                <Button asChild>
                  <Link href="/signup">
                    Get Started
                  </Link>
                </Button>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Legal Professional?</h4>
                <p className="text-green-700 text-sm mb-3">
                  Join our network and make a difference through pro bono work.
                </p>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/signup">
                    Join Now
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}