export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type ImpactEffort = "low" | "medium" | "high";

export interface OpportunityItem {
  title: string;
  problem: string;
  aiApproach: string;
  impact: ImpactEffort;
  effort: ImpactEffort;
}

export interface OpportunitySummary {
  companyContext: string;
  opportunities: OpportunityItem[];
  suggestedNextStep: string;
}

export interface ExploreStage {
  id: string;
  title: string;
  hint: string;
  chips: string[];
}

export const EXPLORE_STAGES: ExploreStage[] = [
  {
    id: "context",
    title: "Context",
    hint: "Tell us about your organization and role.",
    chips: [
      "Finance / Controlling",
      "Operations",
      "Customer service",
      "IT / Digital",
      "Leadership / Strategy",
    ],
  },
  {
    id: "processes",
    title: "Processes",
    hint: "Where is work manual, slow, or error-prone?",
    chips: [
      "Document-heavy work",
      "Reporting & data",
      "Repetitive manual tasks",
      "Decision support",
      "Customer inquiries",
    ],
  },
  {
    id: "priority",
    title: "Priority",
    hint: "What outcome matters most right now?",
    chips: [
      "Save time",
      "Reduce errors",
      "Faster insights",
      "Scale without headcount",
      "Better customer experience",
    ],
  },
];

/** Minimum user answers before "Generate summary" is offered. */
export const MIN_ANSWERS_FOR_SUMMARY = 3;

export const OPENING_MESSAGE =
  "I'll help you explore where AI could create value in your processes — this is a short guided conversation, not a permanent record.\n\nTo start: what kind of organization are you in, and what is your role?";
