import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DiagramViewer } from "../../../components/DiagramViewer";
import { FixedNavigation } from "../../../components/FixedNavigation";
import { getProject, projects } from "../../../data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.number} ${project.title}`,
    description: `${project.subtitle}。${project.statement}`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const projectStyle = {
    "--project-color": project.color,
    "--project-ink": project.ink,
  } as React.CSSProperties;

  return (
    <main className={`project-page project-${project.number}`} style={projectStyle}>
      <FixedNavigation />

      <div className="project-info-bar">
        <div><span>项目</span><strong>{project.number} / {project.title}</strong></div>
        <div><span>类型</span><strong>{project.type}</strong></div>
        <div><span>地点</span><strong>{project.site}</strong></div>
        <div><span>年份</span><strong>{project.year}</strong></div>
      </div>

      <header className="project-opening">
        <div className="project-title-block">
          <span className="project-giant-number">{project.number}</span>
          <h2>{project.englishTitle}</h2>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
          <ul>{project.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}</ul>
        </div>
        <figure className="project-hero-media">
          <img src={project.cover} alt={`${project.title}主效果图`} decoding="async" fetchPriority="high" />
          <figcaption><span>主场景 / 01</span><span>{project.site}</span></figcaption>
        </figure>
      </header>

      <section className="project-statement module-grid">
        <div className="module-label"><span>01</span><h2>项目<br />陈述</h2></div>
        <p className="statement-large">{project.statement}</p>
      </section>

      <section className="context-module module-grid">
        <div className="module-label"><span>02</span><h2>场地<br />背景</h2></div>
        <article><span>A / 场地</span><p>{project.context}</p></article>
        <article><span>B / 问题</span><p>{project.problem}</p></article>
      </section>

      <section className="board-archive">
        <div className="board-archive-heading">
          <span>03 / 完整项目图纸</span>
          <h2>让图纸成为主体，<br />完整阅读设计推导。</h2>
          <p>以下图纸按原作品集顺序呈现。点击任意图纸，可进入全屏模式缩放与拖动查看。</p>
        </div>
        <div className="board-list">
          {project.boards.map((board, index) => (
            <DiagramViewer
              key={board}
              src={board}
              alt={`${project.title}完整项目图纸 ${index + 1}`}
              caption={`${project.number} / 项目图纸 ${String(index + 1).padStart(2, "0")} / 共 ${String(project.boards.length).padStart(2, "0")} 张`}
            />
          ))}
        </div>
      </section>

      <section className="impact-module module-grid">
        <div className="module-label"><span>04</span><h2>项目<br />价值</h2></div>
        <blockquote>{project.impact}</blockquote>
        <dl>
          <div><dt>职责</dt><dd>调研 / 策略 / 空间设计 / 视觉表达</dd></div>
          <div><dt>项目说明</dt><dd>学术设计项目 · 作品集内容已重新编辑为网页阅读结构</dd></div>
        </dl>
      </section>

      {project.number === "04" ? (
        <Link className="ending-transition-link" href="/ending">
          <span>04 / ARCHIVE COMPLETE</span>
          <strong>作品档案，缓慢收起。</strong>
          <small>进入结尾场景 / OPEN ENDING →</small>
        </Link>
      ) : (
        <Link
          className="next-project"
          href={`/project/${nextProject.slug}`}
          style={{
            "--next-color": nextProject.color,
            "--next-ink": nextProject.ink,
          } as React.CSSProperties}
        >
          <span>下一个项目 / {nextProject.number}</span>
          <strong>{nextProject.title}</strong>
          <small>{nextProject.englishTitle} ↗</small>
        </Link>
      )}
    </main>
  );
}
