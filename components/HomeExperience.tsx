"use client";

import Link from "next/link";
import { useState } from "react";
import { projects } from "../data/projects";
import { ContourField } from "./ContourField";
import { FixedNavigation } from "./FixedNavigation";

export function HomeExperience() {
  const [active, setActive] = useState<number | null>(null);
  const activeProject = active === null ? null : projects[active];

  return (
    <main
      className="home-experience"
      style={{
        "--active-color": activeProject?.color ?? "#F8F8F5",
        "--active-ink": activeProject?.ink ?? "#111111",
      } as React.CSSProperties}
    >
      <FixedNavigation />
      <ContourField />

      <header className="home-intro" aria-label="网站介绍">
        <p>环境设计师 / 上海</p>
        <h1><span>SITE</span><span>TO</span><span>LIFE</span></h1>
        <p>从场所到新生</p>
      </header>

      <div
        className="card-rail"
        aria-label="精选项目"
        onWheel={(event) => {
          if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.currentTarget.scrollBy({ left: event.deltaY, behavior: "smooth" });
          }
        }}
      >
        <article className="manifesto-card project-card" tabIndex={0} onFocus={() => setActive(null)}>
          <span className="card-number">00 / 设计宣言</span>
          <p>
            以设计为舟，穿梭于旧屿、古巷、乡野与老厂之间。
          </p>
          <p>
            我尝试让被遗忘的空间重获新生，让在地记忆在当代语境中继续生长。
          </p>
          <span className="card-coordinate">N31°13′17″ / E121°28′</span>
        </article>

        {projects.map((project, index) => (
          <Link
            className="project-card image-card"
            href={`/project/${project.slug}`}
            key={project.slug}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            style={{ "--project-color": project.color } as React.CSSProperties}
          >
            <img
              src={project.cover}
              alt={`${project.title}项目预览`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <span className="card-scrim" aria-hidden="true" />
            <span className="card-number">{project.number}</span>
            <span className="card-title">
              <strong>{project.title}</strong>
              <small>{project.englishTitle}</small>
            </span>
            <span className="card-meta">{project.type}<br />{project.site}</span>
          </Link>
        ))}
        <Link className="project-card index-card" href="/work">
          <span className="card-number">作品目录 / 04</span>
          <strong>查看全部作品</strong>
          <span>按类型、地点与年份浏览</span>
        </Link>
      </div>

      <div className="active-project-caption" aria-live="polite">
        {activeProject ? (
          <>
            <span>{activeProject.number}</span>
            <strong>{activeProject.title}</strong>
            <span>{activeProject.keywords.join(" · ")}</span>
          </>
        ) : (
          <><span>滚动 / 拖动</span><strong>从右向左穿越场所</strong><span>四个项目</span></>
        )}
      </div>
    </main>
  );
}
