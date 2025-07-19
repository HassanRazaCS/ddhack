"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { ConfirmModal } from "~/components/ui/modal";

interface VerificationActionsProps {
  lawyerId: string;
}

export default function VerificationActions({ lawyerId }: VerificationActionsProps) {
  const [loading, setLoading] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const router = useRouter();

  const handleVerification = async (action: "VERIFIED" | "REJECTED") => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/verify-lawyer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lawyerId,
          action,
        }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Error updating verification status");
      }
    } catch {
      alert("Error updating verification status");
    } finally {
      setLoading(false);
      setShowApproveModal(false);
      setShowRejectModal(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setShowRejectModal(true)}
        disabled={loading}
      >
        Reject
      </Button>
      <Button
        onClick={() => setShowApproveModal(true)}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700"
      >
        {loading ? "Processing..." : "Approve"}
      </Button>

      <ConfirmModal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={() => handleVerification("VERIFIED")}
        title="Approve Lawyer Verification"
        message="Are you sure you want to approve this lawyer? They will gain full access to browse and respond to cases."
        confirmText="Approve"
        variant="primary"
      />

      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={() => handleVerification("REJECTED")}
        title="Reject Lawyer Application"
        message="Are you sure you want to reject this lawyer application? This action can be undone later if needed."
        confirmText="Reject"
        variant="danger"
      />
    </>
  );
}