import type { Metadata } from "next";
import { ProfileExperience } from "../../components/ProfileExperience";

export const metadata: Metadata = {
  title: "PROFILE / CV — 冯驿岚",
  description: "冯驿岚的环境与景观设计个人档案。",
};

export default function ProfilePage() {
  return <ProfileExperience />;
}
