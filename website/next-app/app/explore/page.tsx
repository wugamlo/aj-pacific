import type { Metadata } from "next";
import ExploreExperience from "@/components/explore/ExploreExperience";

export const metadata: Metadata = {
  title: "Explore AI Opportunities | AJ Pacific",
  description:
    "Answer a few questions about how work happens in your organisation. In a couple of minutes you'll get concrete, practical AI opportunity ideas — ready to discuss or take further.",
};

export default function ExplorePage() {
  return (
    <div className="py-4 md:py-8">
      <ExploreExperience />
    </div>
  );
}
