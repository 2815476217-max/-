import type { Metadata } from "next";
import { FixedNavigation } from "../../components/FixedNavigation";
import { WorkIndex } from "../../components/WorkIndex";

export const metadata: Metadata = {
  title: "作品目录",
  description: "冯驿岚的六个环境设计项目：遗址再生、乡村公共空间、文化转译与模块化设计。",
};

export default function WorkPage() {
  return (
    <main className="page-shell work-page">
      <FixedNavigation />
      <header className="page-hero index-hero">
        <span className="eyebrow">作品目录 / PROJECTS</span>
        <h1>场所不是背景。<br />它是设计发生的理由。</h1>
        <div className="hero-aside">
          <span>四个项目</span>
          <p>从海上工业设施到江南水巷，再到包容性社区。每个项目都从场所的既有关系出发。</p>
        </div>
      </header>
      <WorkIndex />
    </main>
  );
}
