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
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="flex-1">
            <CardTitle className="text-lg">{caseData.title}</CardTitle>
            <CardDescription className="mt-1">
              {caseData.legalCategory} • {caseData.jurisdiction},{" "}
              {caseData.country}
            </CardDescription>
          </div>
          <div className="flex gap-2 sm:ml-4 sm:flex-col">
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

        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 text-sm text-gray-500">
          <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
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

        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-2">
          {userType === "SEEKER" ? (
            <>
              <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                View Details
              </Button>
              {caseData._count.interests > 0 && (
                <Button size="sm" className="w-full sm:w-auto" onClick={() => setShowInterested(!showInterested)}>
                  {showInterested ? "Hide Interested Lawyers" : "View Interested Lawyers"}
                </Button>
              )}
            </>
          ) : (
            <Button
              size="sm"
              className="w-full sm:w-auto"
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
          <InterestedLawyers lawyers={interestedLawyers.data} isOpen={showInterested} />
        )}
      </CardContent>
    </Card>
  );
}
