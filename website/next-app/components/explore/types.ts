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
    hint: "Tell us about your organisation and role.",
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
  "I'll help you explore where AI could create value in your processes. After a few answers, Generate summary unlocks with practical opportunity ideas.\n\nTo start: what kind of organisation are you in, and what is your role?";

/**
 * Pre-scripted sample conversations — load into Explore chat so visitors can
 * try "Generate summary" without typing. Distinct from the static
 * /services/ai/where-ai-helps situations page.
 */
export interface SampleConversation {
  id: string;
  label: string;
  description: string;
  /** Full conversation including opening assistant message + 3 user/assistant turn pairs. */
  messages: ChatMessage[];
}

export const SAMPLE_CONVERSATIONS: SampleConversation[] = [
  {
    id: "finance-controlling",
    label: "Finance & Controlling",
    description: "Monthly reporting, variance analysis, manual data collection",
    messages: [
      { role: "assistant", content: OPENING_MESSAGE },
      {
        role: "user",
        content:
          "Mid-sized industrial company, about 400 people. I'm in Group Controlling — we own monthly reporting and variance analysis.",
      },
      {
        role: "assistant",
        content:
          "Thanks. Controlling often has a lot of manual stitching between systems and spreadsheets.\n\nWhere does the work feel most slow or error-prone today — data collection for the monthly pack, variance explanations, forecast updates, or something else?",
      },
      {
        role: "user",
        content:
          "Mainly data collection and the variance pack. Controllers pull numbers from ERP, Excel, and a BI tool, then rewrite commentary every month. The same narrative patterns come back with different figures.",
      },
      {
        role: "assistant",
        content:
          "That's a classic high-friction loop: multi-source pulls plus repetitive narrative writing.\n\nWhat outcome matters most right now — cut days off the close, freer capacity for analysis, fewer version/errors, or faster answers for leadership?",
      },
      {
        role: "user",
        content:
          "We need to save time on the pack and get better variance insights to leadership without adding headcount. Ideal if the first draft of commentary was already solid.",
      },
      {
        role: "assistant",
        content:
          "Clear priorities: time savings on the monthly pack and stronger variance insight for leadership.\n\nYou have enough context for a short opportunity summary — or keep going if you want to add detail (systems, team size, or a second pain area).",
      },
    ],
  },
  {
    id: "document-operations",
    label: "Document-heavy Operations",
    description: "Invoices, contracts, supplier documents, repetitive extraction",
    messages: [
      { role: "assistant", content: OPENING_MESSAGE },
      {
        role: "user",
        content:
          "Regional trading firm with several entities. I run operations / back office — a lot of invoices, contracts, and supplier paperwork.",
      },
      {
        role: "assistant",
        content:
          "Document-heavy ops is a frequent place AI helps without a big system rebuild.\n\nWhich documents create the most drag — invoices and PO matching, contracts and terms, shipping/customs packs, or something else?",
      },
      {
        role: "user",
        content:
          "Invoices and supplier docs. Staff re-key data into our ERP, chase missing fields, and re-check the same line items. Contracts sit in shared drives; people re-read them for the same clauses.",
      },
      {
        role: "assistant",
        content:
          "So two streams: structured extraction/entry for invoices, and find-and-answer on contracts.\n\nWhat would success look like in the next 3–6 months — fewer hours on data entry, fewer errors, faster cycle time, or better auditability?",
      },
      {
        role: "user",
        content:
          "Fewer hours on repetitive extraction and fewer typos going into the ERP. Speed matters, but accuracy is non-negotiable.",
      },
      {
        role: "assistant",
        content:
          "Got it: accuracy-first automation on extraction, with time savings as the main payoff.\n\nEnough to draft opportunity ideas — hit Generate summary, or add more (volume, languages, systems) if you like.",
      },
    ],
  },
  {
    id: "knowledge-support",
    label: "Internal Knowledge & Support",
    description: "People searching drives/emails for answers, policy questions",
    messages: [
      { role: "assistant", content: OPENING_MESSAGE },
      {
        role: "user",
        content:
          "Professional services company, ~150 people. I'm in operations / internal support — people constantly ask where policies and process answers live.",
      },
      {
        role: "assistant",
        content:
          "Internal knowledge chase is very common once tools and folders multiply.\n\nWhere do people usually search today — shared drives, email, intranet, Slack/Teams, or a mix — and what questions come up most?",
      },
      {
        role: "user",
        content:
          "A mix of SharePoint, email, and chat. Same questions on travel policy, client onboarding steps, and who owns what. Support and managers re-answer the same things weekly.",
      },
      {
        role: "assistant",
        content:
          "Repeated Q&A plus fragmented sources — good candidate for a guided knowledge assistant with clear source links.\n\nWhat matters most: cut time spent searching, reduce interruptions for experts, consistent answers, or onboarding new hires faster?",
      },
      {
        role: "user",
        content:
          "Reduce interruptions for experts and give people a faster first answer they can trust — especially for policy and process questions.",
      },
      {
        role: "assistant",
        content:
          "Priorities are clear: fewer expert interruptions and trustworthy first answers on policy/process.\n\nYou can Generate summary now, or keep chatting to refine scope (regions, languages, sensitive content).",
      },
    ],
  },
];
