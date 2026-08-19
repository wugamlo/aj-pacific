/** Shared public copy so the Opportunity Call and contact path stay consistent. */

export const CONTACT_EMAIL = "info@aj-pacific.com";

export const CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd3SEUmj85HkL51ejeqS3rufhPMIg3sWwq6O8myhpJFpYOz0Q/viewform";

export const OPPORTUNITY_CALL = {
  title: "AI Opportunity Call",
  duration: "Free, 45–60 minutes, no obligation.",
  who: "One or both partners, depending on the topic — not a salesperson, and not a junior team.",
  prepare:
    "A few lines on the company, your role, and the friction. A sample report or short process note helps if you have one.",
  leaveWith:
    "A verbal picture of whether AI, education, or controlling is the right next conversation — and if so, what a scan or session would cover. Not a proposal deck.",
  next: "We reply by email and suggest a time.",
} as const;

export const EMAIL_PREPARE_HINTS = [
  "Company and roughly how large it is",
  "Your role",
  "The friction or question you want to talk through",
] as const;

export function mailtoHref(subject?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  params.set(
    "body",
    "Company:\nRole:\nThe friction:\n\n(A sample report or short process note is welcome if you have one.)\n"
  );
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
