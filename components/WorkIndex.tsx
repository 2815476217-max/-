"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, projects } from "../data/projects";

const categoryLabels: Record<string, string> = {
  All: "全部",
  Heritage: "遗产更新",
  Rural: "乡村",
  "Public Space": "公共空间",
  Modular: "模块化",
  Research: "研究",
};

export function WorkIndex() {
  const [category, setCategory] = useState("All");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const filtered = useMemo(
    () => projects.filter((project) => category === "All" || project.categories.includes(category)),
    [category],
  );
  const active = projects.find((project) => project.slug === activeSlug);

  return (
    <section
      className="work-index"
      onPointerMove={(event) => setPointer({ x: event.clientX, y: event.clientY })}
    >
      <div className="category-bar" role="toolbar" aria-label="筛选项目">
        {categories.map((item) => (
          <button
            className={item === category ? "is-active" : ""}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {categoryLabels[item] ?? item}
          </button>
        ))}
      </div>

      <div className="index-heading" aria-hidden="true">
        <span>编号</span><span>项目</span><span>类型</span><span>地点 / 年份</span>
      </div>

      <div className="index-list">
        {filtered.map((project) => (
          <Link
            className="index-row"
            href={`/project/${project.slug}`}
            key={project.slug}
            onMouseEnter={() => setActiveSlug(project.slug)}
            onMouseLeave={() => setActiveSlug(null)}
            onFocus={() => setActiveSlug(project.slug)}
            onBlur={() => setActiveSlug(null)}
            style={{
              "--row-color": project.color,
              "--row-ink": project.ink,
            } as React.CSSProperties}
          >
            <span className="index-number">{project.number}</span>
            <span className="index-title">
              <strong>{project.title}</strong>
              <small>{project.englishTitle}</small>
            </span>
            <span className="index-type">{project.type}</span>
            <span className="index-site">{project.site}<small>{project.year}</small></span>
          </Link>
        ))}
      </div>

      {active ? (
        <div
          className="cursor-preview"
          style={{ transform: `translate3d(${pointer.x + 28}px, ${pointer.y - 180}px, 0)` }}
          aria-hidden="true"
        >
          <img src={active.cover} alt="" loading="lazy" decoding="async" />
          <span>{active.number} / {active.englishTitle}</span>
        </div>
      ) : null}
    </section>
  );
}
