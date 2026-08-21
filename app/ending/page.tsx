import type { Metadata } from "next";
import { EndingExperience } from "../../components/EndingExperience";

export const metadata: Metadata = {
  title: "设计仍在继续｜Ending",
  description: "作品档案结尾与联系方式。",
};

export default function EndingPage() {
  return <EndingExperience />;
}
