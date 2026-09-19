"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  MessageSquare,
  Phone,
  FileText,
  Workflow,
  Box,
} from "lucide-react";

const examples = [
  {
    label: "Call answering",
    icon: Phone,
    channel: "Incoming enquiry",
    message: "Can you repair a leaning fence in South Surrey?",
    action: "Ask the right questions",
    detail: "Service area, job details and the best way to call back.",
    outcome: "A useful handover",
    summary: "Fence repair · South Surrey",
    next: "Owner to review scope and arrange a visit.",
  },
  {
    label: "Quote follow-up",
    icon: MessageSquare,
    channel: "Open quote",
    message:
      "Thanks for the estimate. Could we split the work into two visits?",
    action: "Keep the context",
    detail: "Pause the follow-up sequence when the customer replies.",
    outcome: "A conversation to continue",
    summary: "Quote question · scheduling",
    next: "Owner to confirm whether two visits will work.",
  },
  {
    label: "Everyday admin",
    icon: FileText,
    channel: "Website request",
    message: "We need a spring cleanup and regular lawn care after that.",
    action: "Organise the details",
    detail: "Capture the services, property information and preferred timing.",
    outcome: "One clear summary",
    summary: "Cleanup + ongoing lawn care",
    next: "Owner to check the property and prepare an estimate.",
  },
];

export default function WorkflowPreview() {
  const [selected, setSelected] = useState(-1);
  const [rotation, setRotation] = useState(32);
  const scene = examples[Math.max(0, selected)];
  const Icon = scene.icon;
  return (
    <div className="studio-workflow">
      <div className="studio-workflow-bar">
        <span className="studio-workflow-title">
          <Workflow size={17} aria-hidden="true" /> A few things we can build
        </span>
        <span className="studio-example-label">Interactive examples</span>
      </div>
      <div
        className="studio-switcher"
        role="group"
        aria-label="Explore an example workflow"
      >
        <button
          type="button"
          aria-pressed={selected === -1}
          onClick={() => setSelected(-1)}
        >
          <Box size={15} aria-hidden="true" /> Websites & 3D
        </button>
        {examples.map((example, index) => (
          <button
            key={example.label}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <example.icon size={15} aria-hidden="true" /> {example.label}
          </button>
        ))}
      </div>
      {selected === -1 ? (
        <div className="studio-experience">
          <div className="studio-experience-copy">
            <span className="studio-kicker">Design you can interact with</span>
            <h2>
              A different
              <br />
              point of view.
            </h2>
            <p>
              Clean websites. Thoughtful motion. A little dimension when it
              makes the experience better.
            </p>
            <label htmlFor="studio-rotation">
              Give it a turn <ArrowRight size={14} aria-hidden="true" />
            </label>
            <input
              id="studio-rotation"
              aria-label="Rotate the 3D example"
              type="range"
              min="-180"
              max="180"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
            />
          </div>
          <div
            className="studio-sculpture"
            role="img"
            aria-label="An interactive three-dimensional blue frame sculpture"
          >
            <div
              className="studio-cube"
              style={{ transform: `rotateX(-22deg) rotateY(${rotation}deg)` }}
            >
              {["front", "back", "left", "right", "top", "bottom"].map(
                (face) => (
                  <span key={face} className={`studio-cube-${face}`} />
                ),
              )}
            </div>
            <div className="studio-sculpture-shadow" />
          </div>
          <span className="studio-experience-label">
            01 — Interactive web study
          </span>
        </div>
      ) : (
        <div className="studio-flow" aria-live="polite" aria-atomic="true">
          <div className="studio-flow-step">
            <div className="studio-flow-label">
              <span>01</span> {scene.channel}
            </div>
            <div className="studio-message">
              <div className="studio-node-icon">
                <Icon size={20} aria-hidden="true" />
              </div>
              <p>&ldquo;{scene.message}&rdquo;</p>
              <span className="studio-small">Sample customer message</span>
            </div>
          </div>
          <ArrowRight
            className="studio-connector"
            size={22}
            aria-hidden="true"
          />
          <div className="studio-flow-step studio-flow-middle">
            <div className="studio-flow-label">
              <span>02</span> Your configured assistant
            </div>
            <div className="studio-processor">
              <div className="studio-orbit" aria-hidden="true">
                <Workflow size={28} />
              </div>
              <h3>{scene.action}</h3>
              <p>{scene.detail}</p>
              <div className="studio-rules">
                <Check size={13} aria-hidden="true" /> Your rules. A defined
                handover.
              </div>
            </div>
          </div>
          <ArrowRight
            className="studio-connector"
            size={22}
            aria-hidden="true"
          />
          <div className="studio-flow-step">
            <div className="studio-flow-label">
              <span>03</span> Back to you
            </div>
            <div className="studio-handover">
              <div className="studio-handover-label">
                <span className="studio-status-dot" /> {scene.outcome}
              </div>
              <h3>{scene.summary}</h3>
              <p>{scene.next}</p>
              <span className="studio-handover-state">
                <Check size={13} aria-hidden="true" /> Ready for owner review
              </span>
            </div>
          </div>
        </div>
      )}
      <p className="studio-workflow-note">
        {selected === -1
          ? "A small interactive design study, built in the browser. Use the slider to explore it."
          : "An example of the workflow, not a live call or customer result. Nothing here is sent or booked."}
      </p>
    </div>
  );
}
