"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export function SuccessBanner() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('created') === 'true') {
      setShowSuccess(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!showSuccess) return null;

  return (
    <div className="mb-8">
      <Card className="border-l-4 border-l-green-500 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Case Created Successfully! 🎉</CardTitle>
          <CardDescription className="text-green-700">
            Your case has been submitted and is now visible to verified pro bono lawyers. You&apos;ll be notified when lawyers express interest.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}