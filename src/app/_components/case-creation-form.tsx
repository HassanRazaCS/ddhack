"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

const legalCategories = [
  "Immigration Law",
  "Criminal Defense",
  "Employment Law",
  "Housing Law",
  "Consumer Protection",
  "Personal Injury",
  "Civil Rights",
  "Landlord/Tenant Issues",
  "Disability Rights",
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
          <div className="space-y-2">
            <Label htmlFor="title">Case Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              placeholder="Brief summary of your legal issue"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
            />
            <p className="text-sm text-muted-foreground">
              Provide a clear, concise title that summarizes your legal issue
            </p>
          </div>

          {/* Legal Category */}
          <div className="space-y-2">
            <Label htmlFor="legalCategory">Legal Category <span className="text-red-500">*</span></Label>
            <Select value={legalCategory} onValueChange={setLegalCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a legal category" />
              </SelectTrigger>
              <SelectContent>
                {legalCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of your legal issue, including relevant facts, timeline, and what kind of help you're seeking..."
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              required
              className="min-h-[150px]"
            />
            <p className="text-sm text-muted-foreground">
              Include background information, key facts, timeline, and what specific help you need
            </p>
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
              <Input
                id="country"
                placeholder="e.g., United States, Canada, United Kingdom"
                value={country}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Country where the legal issue occurred
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction/State/Province <span className="text-red-500">*</span></Label>
              <Input
                id="jurisdiction"
                placeholder="e.g., California, Ontario, England & Wales"
                value={jurisdiction}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJurisdiction(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Specific legal jurisdiction
              </p>
            </div>
          </div>

          {/* Urgency Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Urgency Level <span className="text-red-500">*</span>
            </Label>
            <div className="space-y-2">
              {urgencyLevels.map((level) => (
                <label key={level.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="urgencyLevel"
                    value={level.value}
                    checked={urgencyLevel === level.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrgencyLevel(e.target.value as "LOW" | "MEDIUM" | "HIGH" | "URGENT")}
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
          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">Preferred Communication Language (Optional)</Label>
            <Input
              id="preferredLanguage"
              placeholder="e.g., English, Spanish, French"
              value={preferredLanguage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPreferredLanguage(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Language you&apos;d prefer to communicate in with lawyers
            </p>
          </div>

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
              variant="outline"
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