"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { InterestedLawyers } from "./interested-lawyers";
import { useState } from "react";

interface CaseCardProps {
  case: {
    id: string;
    title: string;
    description: string;
    legalCategory: string;
    jurisdiction: string;
    country: string;
    urgencyLevel: string;
    status: string;
    preferredLanguage?: string | null;
    createdAt: string | Date;
    _count: {
      interests: number;
    };
    seeker?: {
      name: string | null;
    };
    interests: {
      lawyerId: string;
    }[];
  };
  userType: "SEEKER" | "LAWYER";
  lawyerId?: string;
}

export function CaseCard({
  case: caseData,
  userType,
  lawyerId,
}: CaseCardProps) {
  const router = useRouter();
  const [showInterested, setShowInterested] = useState(false);
  const interestedLawyers = api.case.getInterestedLawyers.useQuery(
    { caseId: caseData.id },
    { enabled: showInterested },
  );
  const expressInterest = api.case.expressInterest.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const isInterested = caseData.interests.some(
    (interest) => interest.lawyerId === lawyerId,
  );

  const urgencyColors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-orange-100 text-orange-800",
    URGENT: "bg-red-100 text-red-800",
  };

  const statusColors = {
    ACTIVE: "bg-blue-100 text-blue-800",
    IN_REVIEW: "bg-purple-100 text-purple-800",
    CLOSED: "bg-gray-100 text-gray-800",
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{caseData.title}</CardTitle>
            <CardDescription className="mt-1">
              {caseData.legalCategory} • {caseData.jurisdiction},{" "}
              {caseData.country}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col gap-2">
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${urgencyColors[caseData.urgencyLevel as keyof typeof urgencyColors]}`}
            >
              {caseData.urgencyLevel}
            </span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${statusColors[caseData.status as keyof typeof statusColors]}`}
            >
              {caseData.status}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {caseData.description}
        </p>

        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>Created {formatDate(caseData.createdAt)}</span>
            {caseData.preferredLanguage && (
              <span>Language: {caseData.preferredLanguage}</span>
            )}
          </div>
          {userType === "SEEKER" && (
            <span className="flex items-center">
              <span className="mr-1">👥</span>
              {caseData._count.interests} lawyer
              {caseData._count.interests !== 1 ? "s" : ""} interested
            </span>
          )}
          {userType === "LAWYER" && caseData.seeker && (
            <span>By {caseData.seeker.name ?? "Anonymous"}</span>
          )}
        </div>

        <div className="flex justify-end">
          {userType === "SEEKER" ? (
            <div className="space-x-2">
              <Button variant="secondary" size="sm">
                View Details
              </Button>
              {caseData._count.interests > 0 && (
                <Button size="sm" onClick={() => setShowInterested(!showInterested)}>
                  {showInterested ? "Hide" : "View"} Interested Lawyers
                </Button>
              )}
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => expressInterest.mutate({ caseId: caseData.id })}
              disabled={isInterested ?? expressInterest.isPending}
            >
              {isInterested
                ? "Interest Expressed"
                : expressInterest.isPending
                  ? "Submitting..."
                  : "Express Interest"}
            </Button>
          )}
        </div>
        {showInterested && interestedLawyers.data && (
          <InterestedLawyers lawyers={interestedLawyers.data} />
        )}
      </CardContent>
    </Card>
  );
}
