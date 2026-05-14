import { WorkClient } from "@/components/work/WorkClient";
import { PROJECTS } from "@/lib/projects";

export default function WorkPage() {
  return <WorkClient projects={PROJECTS} />;
}
