"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input, Textarea } from "~/components/ui/input";

const legalCategories = [
  "Family Law",
  "Immigration Law",
  "Criminal Defense",
  "Employment Law",
  "Housing Law",
  "Consumer Protection",
  "Personal Injury",
  "Civil Rights",
  "Bankruptcy",
  "Estate Planning",
  "Contract Disputes",
  "Landlord/Tenant Issues",
  "Disability Rights",
  "Healthcare Law",
  "Education Law",
  "Other"
];

const urgencyLevels = [
  { value: "LOW", label: "Low - General consultation needed", color: "text-green-700" },
  { value: "MEDIUM", label: "Medium - Important but not urgent", color: "text-yellow-700" },
  { value: "HIGH", label: "High - Time-sensitive issue", color: "text-orange-700" },
  { value: "URGENT", label: "Urgent - Immediate attention required", color: "text-red-700" }
];

export default function CaseCreationForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [legalCategory, setLegalCategory] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [country, setCountry] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("MEDIUM");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title.trim() || !description.trim() || !legalCategory || !jurisdiction.trim() || !country.trim()) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const caseData = {
        title: title.trim(),
        description: description.trim(),
        legalCategory,
        jurisdiction: jurisdiction.trim(),
        country: country.trim(),
        urgencyLevel,
        preferredLanguage: preferredLanguage.trim() ?? undefined,
      };

      const response = await fetch("/api/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caseData),
      });

      const data = await response.json() as { error?: string; case?: object };

      if (!response.ok) {
        setError(data.error ?? "An error occurred while creating your case");
      } else {
        router.push("/dashboard/seeker?created=true");
        router.refresh();
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Details</CardTitle>
        <CardDescription>
          The more detailed information you provide, the better lawyers can assess if they can help with your case.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Case Title */}
          <Input
            id="title"
            label="Case Title"
            placeholder="Brief summary of your legal issue"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            helperText="Provide a clear, concise title that summarizes your legal issue"
          />

          {/* Legal Category */}
          <div>
            <label htmlFor="legalCategory" className="block text-sm font-medium text-gray-700 mb-2">
              Legal Category <span className="text-red-500">*</span>
            </label>
            <select
              id="legalCategory"
              value={legalCategory}
              onChange={(e) => setLegalCategory(e.target.value)}
              required
              className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            >
              <option value="">Select a legal category</option>
              {legalCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <Textarea
            id="description"
            label="Detailed Description"
            placeholder="Provide a detailed description of your legal issue, including relevant facts, timeline, and what kind of help you're seeking..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="min-h-[150px]"
            helperText="Include background information, key facts, timeline, and what specific help you need"
          />

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="country"
              label="Country"
              placeholder="e.g., United States, Canada, United Kingdom"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              helperText="Country where the legal issue occurred"
            />

            <Input
              id="jurisdiction"
              label="Jurisdiction/State/Province"
              placeholder="e.g., California, Ontario, England & Wales"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              required
              helperText="Specific legal jurisdiction"
            />
          </div>

          {/* Urgency Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Urgency Level <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {urgencyLevels.map((level) => (
                <label key={level.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="urgencyLevel"
                    value={level.value}
                    checked={urgencyLevel === level.value}
                    onChange={(e) => setUrgencyLevel(e.target.value as "LOW" | "MEDIUM" | "HIGH" | "URGENT")}
                    className="mr-3"
                  />
                  <span className={`${level.color} font-medium`}>
                    {level.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Language */}
          <Input
            id="preferredLanguage"
            label="Preferred Communication Language (Optional)"
            placeholder="e.g., English, Spanish, French"
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
            helperText="Language you'd prefer to communicate in with lawyers"
          />

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="min-w-[120px]"
            >
              {loading ? "Creating..." : "Create Case"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}