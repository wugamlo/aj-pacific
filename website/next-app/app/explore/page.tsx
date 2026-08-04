import type { Metadata } from "next";
import ExploreExperience from "@/components/explore/ExploreExperience";

export const metadata: Metadata = {
  title: "Explore AI Opportunities | AJ Pacific",
  description:
    "A short guided conversation to explore practical AI opportunities in your processes. Indicative ideas — not a full Opportunity Scan.",
};

export default function ExplorePage() {
  return (
    <div className="py-4 md:py-8">
      <ExploreExperience />
    </div>
  );
}
