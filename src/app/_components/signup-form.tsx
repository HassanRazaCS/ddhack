"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
          specializations: specializations.split(",").map(s => s.trim()).filter(Boolean),
          yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
          languagesSpoken: languagesSpoken.split(",").map(l => l.trim()).filter(Boolean),
        }),
      };

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json() as { error?: string };

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
          setError("Account created but sign-in failed. Please try signing in manually.");
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
          <label className="block text-sm font-medium mb-3">
            I am...
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="userType"
                value="SEEKER"
                checked={userType === "SEEKER"}
                onChange={(e) => setUserType(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Seeking Legal Aid</div>
                <div className="text-sm text-gray-600">I need legal assistance</div>
              </div>
            </label>
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="userType"
                value="LAWYER"
                checked={userType === "LAWYER"}
                onChange={(e) => setUserType(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-medium">Lawyer</div>
                <div className="text-sm text-gray-600">I want to offer pro bono services</div>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {userType === "LAWYER" && (
          <>
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Lawyer Verification Information</h3>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">
                Professional Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required={userType === "LAWYER"}
                className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Full legal name as licensed"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="licenseNumber" className="block text-sm font-medium">
                License Number
              </label>
              <input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                required={userType === "LAWYER"}
                className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Professional license number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required={userType === "LAWYER"}
                className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="e.g., United States, Canada, United Kingdom"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="jurisdiction" className="block text-sm font-medium">
                Jurisdiction
              </label>
              <input
                id="jurisdiction"
                name="jurisdiction"
                type="text"
                required={userType === "LAWYER"}
                className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="e.g., California, Ontario, England & Wales"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium">
                Professional Contact Email
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                required={userType === "LAWYER"}
                className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Professional email address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="firmName" className="block text-sm font-medium">
                Law Firm Name (Optional)
              </label>
              <input
                id="firmName"
                name="firmName"
                type="text"
                className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Law firm or organization"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="specializations" className="block text-sm font-medium">
                Legal Specializations
              </label>
              <input
                id="specializations"
                name="specializations"
                type="text"
                className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="e.g., Family Law, Corporate Law, Human Rights (comma separated)"
                value={specializations}
                onChange={(e) => setSpecializations(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium">
                Years of Experience (Optional)
              </label>
              <input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                min="0"
                max="60"
                className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="Years of practice"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="languagesSpoken" className="block text-sm font-medium">
                Languages Spoken (Optional)
              </label>
              <input
                id="languagesSpoken"
                name="languagesSpoken"
                type="text"
                className="relative block w-full rounded-md border-0 px-3 py-1.5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                placeholder="e.g., English, Spanish, French (comma separated)"
                value={languagesSpoken}
                onChange={(e) => setLanguagesSpoken(e.target.value)}
              />
            </div>
          </>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
}
