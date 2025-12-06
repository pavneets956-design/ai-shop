"use client";

import { useState } from "react";
import { Phone, PhoneOff } from "lucide-react";

interface AgentCallButtonProps {
  contactId: string;
  phoneNumber: string;
  companyName: string;
}

export default function AgentCallButton({ contactId, phoneNumber, companyName }: AgentCallButtonProps) {
  const [isCalling, setIsCalling] = useState(false);
  const [callStatus, setCallStatus] = useState<string | null>(null);

  const initiateCall = async () => {
    setIsCalling(true);
    setCallStatus("Initiating call...");

    try {
      const response = await fetch("/api/agent/call", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toNumber: phoneNumber,
          contactId,
        }),
      });

      const data = await response.json();

      if (data.callId) {
        setCallStatus("Call initiated! Agent is calling now...");
        // In production, you'd set up real-time updates via WebSocket or polling
      } else {
        setCallStatus("Failed to initiate call");
        setIsCalling(false);
      }
    } catch (error) {
      console.error("Call error:", error);
      setCallStatus("Error initiating call");
      setIsCalling(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {callStatus && (
        <span className="text-sm text-gray-400 font-light">{callStatus}</span>
      )}
      <button
        onClick={initiateCall}
        disabled={isCalling}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-light transition-all ${
          isCalling
            ? "bg-gray-800 text-gray-400 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {isCalling ? (
          <>
            <PhoneOff className="w-4 h-4" />
            Calling...
          </>
        ) : (
          <>
            <Phone className="w-4 h-4" />
            Start Call
          </>
        )}
      </button>
    </div>
  );
}

