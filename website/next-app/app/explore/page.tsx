import ExploreExperience from "@/components/explore/ExploreExperience";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Explore AI Opportunities",
  description:
    "A free guided conversation about how work happens in your organisation. In a few minutes, get concrete, practical AI opportunity ideas — no signup required.",
  path: "/explore",
});

export default function ExplorePage() {
  return (
    <div className="py-4 md:py-8">
      <ExploreExperience />
    </div>
  );
}
