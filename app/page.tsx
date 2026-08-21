import type { Metadata } from "next";
import { ProfileExperience } from "../components/ProfileExperience";

export const metadata: Metadata = {
  title: "SITE TO LIFE — 冯驿岚 FYL",
  description: "环境设计师冯驿岚的个人作品集：场所再生、文化记忆、工业遗产与在地更新。",
};

export default function Home() {
  return <ProfileExperience />;
}
