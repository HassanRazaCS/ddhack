"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("SEEKER");
  const [fullName, setFullName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [country, setCountry] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [firmName, setFirmName] = useState("");
  const [specializations, setSpecializations] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const signupData = {
        name,
        email,
        password,
        userType,
        ...(userType === "LAWYER" && {
          fullName,
          licenseNumber,
          jurisdiction,
          country,
          contactEmail,
          firmName,
          specializations: specializations
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          yearsOfExperience: yearsOfExperience
            ? parseInt(yearsOfExperience)
            : null,
          languagesSpoken: languagesSpoken
            .split(",")
            .map((l) => l.trim())
            .filter(Boolean),
        }),
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "An error occurred");
      } else {
        // Auto-signin after successful registration
        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResult?.error) {
          setError(
            "Account created but sign-in failed. Please try signing in manually.",
          );
        } else {
          // Redirect to appropriate dashboard based on user type
          if (userType === "LAWYER") {
            router.push("/dashboard/lawyer");
          } else if (userType === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/dashboard/seeker");
          }
          router.refresh();
        }
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h2 className="text-center text-3xl font-bold tracking-tight">
          Create your account
        </h2>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label className="mb-3 block text-sm font-medium">I am...</Label>
          <RadioGroup
            value={userType}
            onValueChange={setUserType}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
                userType === "SEEKER"
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-200 hover:border-green-200 hover:bg-green-50"
              }`}
            >
              <RadioGroupItem value="SEEKER" id="seeker" className="sr-only" />
              <Label htmlFor="seeker" className="flex cursor-pointer flex-col">
                <div className="mb-3 flex items-center">
                  <div
                    className={`relative h-5 w-5 rounded-full border-2 ${
                      userType === "SEEKER"
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {userType === "SEEKER" && (
                      <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="ml-3 text-base font-semibold text-gray-900">
                    Seeking Legal Aid
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  I need legal assistance and want to connect with pro bono
                  lawyers
                </p>
              </Label>
            </div>
            <div
              className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all ${
                userType === "LAWYER"
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-200 hover:border-green-200 hover:bg-green-50"
              }`}
            >
              <RadioGroupItem value="LAWYER" id="lawyer" className="sr-only" />
              <Label htmlFor="lawyer" className="flex cursor-pointer flex-col">
                <div className="mb-3 flex items-center">
                  <div
                    className={`relative h-5 w-5 rounded-full border-2 ${
                      userType === "LAWYER"
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {userType === "LAWYER" && (
                      <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="ml-3 text-base font-semibold text-gray-900">
                    Lawyer
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  I want to offer pro bono legal services to those in need
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="name" className="block text-sm font-medium">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password" className="block text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {userType === "LAWYER" && (
          <>
            <div className="border-t pt-6">
              <h3 className="mb-4 text-lg font-medium">
                Lawyer Verification Information
              </h3>
            </div>

            <div>
              <Label htmlFor="fullName" className="block text-sm font-medium">
                Professional Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required={userType === "LAWYER"}
                placeholder="Full legal name as licensed"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <Label
                htmlFor="licenseNumber"
                className="block text-sm font-medium"
              >
                License Number
              </Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                required={userType === "LAWYER"}
                placeholder="Professional license number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="country" className="block text-sm font-medium">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                type="text"
                required={userType === "LAWYER"}
                placeholder="e.g., United States, Canada, United Kingdom"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div>
              <Label
                htmlFor="jurisdiction"
                className="block text-sm font-medium"
              >
                Jurisdiction
              </Label>
              <Input
                id="jurisdiction"
                name="jurisdiction"
                type="text"
                required={userType === "LAWYER"}
                placeholder="e.g., California, Ontario, England & Wales"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
              />
            </div>

            <div>
              <Label
                htmlFor="contactEmail"
                className="block text-sm font-medium"
              >
                Professional Contact Email
              </Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                required={userType === "LAWYER"}
                placeholder="Professional email address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="firmName" className="block text-sm font-medium">
                Law Firm Name (Optional)
              </Label>
              <Input
                id="firmName"
                name="firmName"
                type="text"
                placeholder="Law firm or organization"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
              />
            </div>

            <div>
              <Label
                htmlFor="specializations"
                className="block text-sm font-medium"
              >
                Legal Specializations
              </Label>
              <Input
                id="specializations"
                name="specializations"
                type="text"
                placeholder="e.g., Family Law, Corporate Law, Human Rights (comma separated)"
                value={specializations}
                onChange={(e) => setSpecializations(e.target.value)}
              />
            </div>

            <div>
              <Label
                htmlFor="yearsOfExperience"
                className="block text-sm font-medium"
              >
                Years of Experience (Optional)
              </Label>
              <Input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                min="0"
                max="60"
                placeholder="Years of practice"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
              />
            </div>

            <div>
              <Label
                htmlFor="languagesSpoken"
                className="block text-sm font-medium"
              >
                Languages Spoken (Optional)
              </Label>
              <Input
                id="languagesSpoken"
                name="languagesSpoken"
                type="text"
                placeholder="e.g., English, Spanish, French (comma separated)"
                value={languagesSpoken}
                onChange={(e) => setLanguagesSpoken(e.target.value)}
              />
            </div>
          </>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </div>
      </form>
    </div>
  );
}
