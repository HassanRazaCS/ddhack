import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function VerificationRequirements() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lawyer Verification Requirements</h1>
          <p className="text-gray-600 mt-2">
            Complete information about our lawyer verification process and requirements.
          </p>
        </div>

        {/* Verification Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>📋 Verification Process Overview</CardTitle>
            <CardDescription>
              How we verify lawyer credentials to ensure trust and quality on our platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Application Submission</h3>
                  <p className="text-gray-600">Complete your lawyer profile with all required professional information.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Document Review</h3>
                  <p className="text-gray-600">Our admin team reviews your credentials and verifies them with relevant bar associations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Verification Decision</h3>
                  <p className="text-gray-600">You'll receive notification of approval or rejection within 2-5 business days.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Required Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>📝 Required Information</CardTitle>
            <CardDescription>
              All fields marked as required must be completed for verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Professional Details</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Full legal name (as licensed)</li>
                  <li>• Professional license number</li>
                  <li>• Jurisdiction of practice</li>
                  <li>• Country of practice</li>
                  <li>• Professional contact email</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Additional Information</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Legal specializations</li>
                  <li>• Years of experience (optional)</li>
                  <li>• Law firm affiliation (optional)</li>
                  <li>• Languages spoken (optional)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Standards */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>✅ Verification Standards</CardTitle>
            <CardDescription>
              What we look for when reviewing lawyer applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Active Legal License</h4>
                  <p className="text-gray-600">Current, valid license to practice law in your jurisdiction.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Good Standing</h4>
                  <p className="text-gray-600">No current disciplinary actions or suspensions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Professional Contact</h4>
                  <p className="text-gray-600">Valid professional email address that can be verified.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h4 className="font-semibold text-gray-900">Accurate Information</h4>
                  <p className="text-gray-600">All provided information must be accurate and verifiable.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>⏱️ Verification Timeline</CardTitle>
            <CardDescription>
              Expected timeframes for the verification process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Application Review</h4>
                  <p className="text-gray-600">Initial review of submitted information</p>
                </div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">1-2 days</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Credential Verification</h4>
                  <p className="text-gray-600">Verification with bar associations</p>
                </div>
                <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">2-3 days</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">Final Decision</h4>
                  <p className="text-gray-600">Notification of approval or rejection</p>
                </div>
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Same day</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🆘 Need Help?</CardTitle>
            <CardDescription>
              Contact information and common questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                If you have questions about the verification process or need assistance, please contact our support team:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">Email: verification@legalaidconnect.org</p>
                <p className="text-gray-600">Response time: Within 24 hours</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Common Questions:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• What if my jurisdiction doesn't have a traditional bar association?</li>
                  <li>• Can I practice in multiple jurisdictions on this platform?</li>
                  <li>• What happens if my license expires during verification?</li>
                  <li>• How do I update my information after verification?</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4 justify-center">
          <Link href="/verification/status">
            <Button>Check Verification Status</Button>
          </Link>
          <Link href="/dashboard/lawyer">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}