"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import { FixedNavigation } from "./FixedNavigation";
import { HomeExperience } from "./HomeExperience";

type PartKey = "profile" | "publications" | "awards" | "experience" | "portfolio";

const parts: Array<{ key: PartKey; number: string; zh: string; en: string }> = [
  { key: "profile", number: "01", zh: "个人档案", en: "PROFILE" },
  { key: "publications", number: "02", zh: "论文情况", en: "PUBLICATIONS" },
  { key: "awards", number: "03", zh: "竞赛获奖", en: "AWARDS" },
  { key: "experience", number: "04", zh: "个人经历", en: "EXPERIENCE" },
  { key: "portfolio", number: "05", zh: "作品集", en: "PORTFOLIO" },
];

const publications = [
  { number: "01", title: "Poverty, demand, and coping: A longitudinal investigation on the impact of public leisure facilities on the health of rural elderly.", journal: "PUBLIC HEALTH", meta: "SSCI · 中科院二区", status: "正式见刊", pdf: "/papers/01.pdf" },
  { number: "02", title: "The influence of urban community environment on fertility planning among women of childbearing age in Chinese megacities: an empirical study from Shanghai, China.", journal: "Journal of Housing and the Built Environment", meta: "SSCI · 中科院二区", status: "外审中", pdf: null },
  { number: "03", title: "Residential Facilities, Neighborhood Interaction, and Mental Health Among Rural Older Adults: Differential Effects of Indoor Residential and Community Public Facilities and Implications for Health Equity.", journal: "Journal of Public Health", meta: "SSCI · 中科院二区", status: "外审中", pdf: null },
  { number: "04", title: "社交媒体平台异质性对青年“断情”现象的影响", journal: "《研究心理学进展》", meta: "中文学术论文", status: "正式见刊", pdf: "/papers/04.pdf" },
  { number: "05", title: "上海金山古桥的类型特征及其保护利用研究", journal: "《建筑与环境研究》", meta: "古桥保护与空间研究", status: "正式见刊", pdf: "/papers/05.pdf" },
] as const;

const awards = [
  ["2026", "世界人居绿色设计国际竞赛", "全国赛区金奖", "NATIONAL"],
  ["2025", "中国国际生态设计与工程创新大学生竞赛", "全国赛区金奖", "NATIONAL"],
  ["2025", "蓝桥杯全国软件和信息技术专业人才大赛", "全国赛区金奖", "NATIONAL"],
  ["2025", "学院杯中国室内与环境设计大赛", "全国赛区银奖", "NATIONAL"],
  ["2025", "汇创青春环境设计类决赛", "一等奖", "SHANGHAI"],
  ["2025", "中国之星设计奖", "全国优秀奖", "NATIONAL"],
  ["2024", "米兰设计周中国高校设计学科师生优秀作品展", "全国赛区一等奖", "NATIONAL"],
  ["2024", "全国高校商业精英挑战赛", "全国赛区一等奖", "NATIONAL"],
  ["2025", "上海市奖学金", "市级荣誉", "SHANGHAI"],
  ["2025", "全国大学生艺术展演", "上海市一等奖", "SHANGHAI"],
  ["2025", "上海理工大学优秀学生干部、优秀学生", "校级荣誉", "UNIVERSITY"],
] as const;

const activityPhotos = Array.from({ length: 53 }, (_, index) => `/media/profile/activities/activity-${String(index + 1).padStart(2, "0")}.webp`);

export function ProfileExperience() {
  const [part, setPart] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeCertificate, setActiveCertificate] = useState<number | null>(null);
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [paperNotice, setPaperNotice] = useState<string | null>(null);
  const [introPage, setIntroPage] = useState<0 | 1>(0);
  const heroCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = heroCanvas.current;
    if (!canvas) return;
    const image = new Image();
    image.src = "/media/profile/intro-hero.jpg";
    image.onload = () => {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      context.drawImage(image, 0, 0);
      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frame.data;
      const width = canvas.width;
      const height = canvas.height;
      const visited = new Uint8Array(width * height);
      const queue = new Int32Array(width * height);
      let head = 0;
      let tail = 0;
      const isBackground = (index: number) => {
        const offset = index * 4;
        const red = pixels[offset];
        const green = pixels[offset + 1];
        const blue = pixels[offset + 2];
        return Math.min(red, green, blue) > 242 && Math.max(red, green, blue) - Math.min(red, green, blue) < 22;
      };
      const add = (index: number) => {
        if (!visited[index] && isBackground(index)) { visited[index] = 1; queue[tail++] = index; }
      };
      for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x); }
      for (let y = 0; y < height; y++) { add(y * width); add(y * width + width - 1); }
      while (head < tail) {
        const index = queue[head++];
        pixels[index * 4 + 3] = 0;
        const x = index % width;
        const y = Math.floor(index / width);
        if (x > 0) add(index - 1);
        if (x < width - 1) add(index + 1);
        if (y > 0) add(index - width);
        if (y < height - 1) add(index + width);
      }
      context.putImageData(frame, 0, 0);
    };
  }, []);

  useEffect(() => {
    const requestedPart = Number(new URLSearchParams(window.location.search).get("part"));
    if (Number.isInteger(requestedPart) && requestedPart >= 0 && requestedPart < parts.length) {
      const frame = window.requestAnimationFrame(() => {
        setPart(requestedPart);
        if (requestedPart === 0) setIntroPage(0);
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    if (part !== 1) return;
    const paper = new URLSearchParams(window.location.search).get("paper");
    if (!paper) return;
    const savedPosition = sessionStorage.getItem(`publication-return-${paper}`);
    const timer = window.setTimeout(() => {
      if (savedPosition !== null) window.scrollTo({ top: Number(savedPosition), behavior: "instant" });
      else document.getElementById(`publication-${paper}`)?.scrollIntoView({ block: "center" });
      sessionStorage.removeItem(`publication-return-${paper}`);
    }, 80);
    return () => window.clearTimeout(timer);
  }, [part]);

  const goTo = (index: number) => {
    if (index === part) { if (index === 0) setIntroPage(0); return; }
    setDirection(index > part ? "next" : "prev");
    setPart(index);
    if (index === 0) setIntroPage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const moveCard = (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({ x: ((event.clientY - bounds.top) / bounds.height - .5) * -7, y: ((event.clientX - bounds.left) / bounds.width - .5) * 9 });
  };
  const current = parts[part];

  return <div className={`profile-parts ${current.key === "portfolio" ? "portfolio-active" : ""}`}>
    {current.key !== "portfolio" && <FixedNavigation />}
    <nav className="part-index" aria-label="PROFILE 分区导航">{parts.map((item,index) => <button key={item.key} className={index === part ? "is-active" : ""} onClick={() => goTo(index)}><span>{item.number}</span><i>{item.zh}</i></button>)}<Link href="/ending"><span>06</span><i>结尾</i></Link></nav>
    <div className="part-progress" aria-hidden="true"><span style={{ "--part-progress": `${((part + 1) / 6) * 100}%` } as CSSProperties} /></div>

    {current.key === "portfolio" ? <section key="portfolio" className="portfolio-part is-next" aria-label="05 作品集 PORTFOLIO"><HomeExperience /><button className="portfolio-prev" onClick={() => goTo(3)}>← 04 个人经历</button></section> :
    <main key={current.key} className={`profile-part part-${current.key} is-${direction}`}>
      <header className="part-heading"><p><b>PART {current.number}｜{current.zh}</b><small>{current.en}</small></p><span>{current.number}</span></header>

      {current.key === "profile" && introPage === 0 && <section className="intro-hero-page" aria-labelledby="profile-title">
        <div className="intro-marquee" aria-hidden="true"><span>冯驿岚 — LYNN — LANDSCAPE / SPATIAL DESIGN — 冯驿岚 — LYNN — LANDSCAPE / SPATIAL DESIGN —</span></div>
        <canvas ref={heroCanvas} className="intro-hero-portrait" role="img" aria-label="冯驿岚人物主视觉" />
        <div className="intro-hero-identity"><h1 id="profile-title">环境设计 / 景观设计</h1><p>ENVIRONMENTAL / LANDSCAPE DESIGN</p><h2>上海理工大学</h2><p>University of Shanghai for Science and Technology</p></div>
        <div className="intro-hero-note"><strong>以设计连接空间与生活。</strong><small>Designing connections between people, space and everyday life.</small></div>
        <button className="intro-sub-next" onClick={() => { setDirection("next"); setIntroPage(1); }}>01-1 / 01-2　NEXT →</button>
      </section>}

      {current.key === "profile" && introPage === 1 && <section className="profile-intro-layout intro-card-page" aria-labelledby="profile-story-title">
        <div className="profile-intro-copy"><p>个人档案 <small>PROFILE / CV · 01-2</small></p><h1 id="profile-story-title">以设计连接空间与生活</h1><p className="profile-bio">在研究、实践与真实场地之间寻找新的空间可能，持续关注空间、社区与日常生活的关系。</p><p className="profile-bio-en">I explore the relationship between people, space and everyday life through design and research.</p>
        </div>
        <div className="lanyard-stage"><span className="lanyard-ribbon" aria-hidden="true" /><span className="lanyard-ring" aria-hidden="true" /><button className={`designer-id hanging-designer-id ${flipped ? "is-flipped" : ""}`} onClick={() => setFlipped(value => !value)} onMouseMove={moveCard} onMouseLeave={() => setTilt({ x: 0, y: 0 })} style={{ "--tilt-x": `${tilt.x}deg`, "--tilt-y": `${tilt.y}deg` } as CSSProperties} aria-label="翻转 DESIGNER ID 工作证"><span className="object-cue">翻面 / FLIP ↻</span><span className="id-card-inner">
          <span className="id-card-face id-card-front horizontal-id-front"><img src="/media/profile-lifestyle.jpg" alt="冯驿岚" /><span className="horizontal-id-info"><span className="id-card-top">FYL / DESIGNER ID · 01</span><strong>冯 驿 岚<em>Lynn</em></strong><span className="id-discipline">环境设计 / 景观设计<small>ENVIRONMENTAL / LANDSCAPE DESIGN</small></span><span className="id-university">上海理工大学<small>University of Shanghai for Science and Technology</small></span><span className="id-rank"><span className="id-rank-item"><span>设计大类<small>DESIGN CATEGORY</small></span><b>1 / 277</b></span><span className="id-rank-item"><span>环境设计<small>ENVIRONMENTAL DESIGN</small></span><b>1 / 44</b></span></span></span></span>
          <span className="id-card-face id-card-back horizontal-id-back"><span className="id-back-head"><span>教育背景 / EDUCATION</span><b>2023.09 — 2027.06</b></span><span className="id-back-stats"><span><b>3.93</b><i>/ 4.5</i><small>GPA</small></span><span><b>CET-4</b><i>450</i><small>语言 / LANGUAGE</small></span><span><b>IELTS</b><i>5.5</i><small>LANGUAGE</small></span></span><span className="id-back-courses"><small>相关课程 / SELECTED COURSES</small><span>居住环境改造 98</span><span>城市空间微更新 96</span><span>建筑设计 95</span><span>场地设计原理 100</span><span>景观构造设计 95</span></span><span className="id-back-detail">FYL · N31°13′17″ / E121°28′ · 01</span></span>
        </span></button></div>
      </section>}

      {current.key === "publications" && <section className="publication-part" aria-labelledby="publication-title"><header className="bilingual-title"><h1 id="publication-title">论文情况</h1><p>PUBLICATIONS / ACADEMIC RESEARCH</p></header><div className="editorial-publications">{publications.map(item => <article id={`publication-${item.number}`} key={item.number}><span>{item.number}</span><h2>{item.pdf ? <Link className="publication-title-link" href={`/paper/${item.number}`} onClick={() => sessionStorage.setItem(`publication-return-${item.number}`, String(window.scrollY))}>{item.title}<i aria-hidden="true">↗</i><small>阅读论文 / VIEW PAPER</small></Link> : <button className="publication-title-link is-unavailable" type="button" onClick={() => { setPaperNotice(item.number); window.setTimeout(() => setPaperNotice(null), 2200); }}>{item.title}<small>{paperNotice === item.number ? "PDF 暂未提供 / PDF NOT AVAILABLE" : "PDF 暂未提供"}</small></button>}</h2><div><strong>{item.journal}</strong><small>{item.meta}<br />{item.status}</small></div></article>)}</div></section>}

      {current.key === "awards" && <section className="awards-part" aria-labelledby="awards-title"><header className="bilingual-title"><h1 id="awards-title">竞赛获奖</h1><p>AWARDS & HONORS</p></header><div className="award-lines">{awards.map(([year,name,prize,level]) => <article key={name}><time>{year}</time><h2>{name}</h2><p>{prize}<small>{level}</small></p></article>)}</div><header className="certificate-heading"><h2>竞赛证书</h2><p>CERTIFICATE ARCHIVE</p></header><button className="certificate-composite" onClick={() => setActiveCertificate(0)} aria-label="放大查看完整竞赛证书合集"><img src="/media/profile/certificate-wall.jpg" alt="完整竞赛证书合集" loading="lazy" decoding="async" /><span>VIEW / 查看完整图片 ↗</span></button></section>}

      {current.key === "experience" && <section className="experience-part flowing-experience" aria-labelledby="experience-title"><header className="bilingual-title"><h1 id="experience-title">个人活动经历</h1><p>EXPERIENCE ARCHIVE</p></header><div className={`experience-flow${activeExperience !== null ? " is-paused" : ""}`}><div className="activity-mosaic-track">{[0,1].map(copy => <div className="activity-mosaic-set" key={copy} aria-hidden={copy === 1 || undefined}>{activityPhotos.map((src,index) => <button className={`activity-flow-photo mosaic-size-${index % 10}`} key={`${copy}-${src}`} tabIndex={copy === 1 ? -1 : 0} onClick={() => setActiveExperience(index)} aria-label={`放大查看个人活动照片 ${index + 1}`}><img src={src} alt={copy === 0 ? `个人活动经历照片 ${index + 1}` : ""} loading={copy === 0 && index < 8 ? "eager" : "lazy"} decoding="async" /><span>查看 / VIEW</span></button>)}</div>)}</div></div></section>}

      <footer className="part-controls">{part === 0 && introPage === 1 ? <button onClick={() => { setDirection("prev"); setIntroPage(0); }}>← 01-1 人物主视觉</button> : part > 0 ? <button onClick={() => goTo(part - 1)}>← {parts[part - 1].number} {parts[part - 1].zh}</button> : <span />}{part === 0 && introPage === 0 ? <button onClick={() => { setDirection("next"); setIntroPage(1); }}>01-2 / 工作证简介 →</button> : part < parts.length - 1 && <button onClick={() => goTo(part + 1)}>{parts[part + 1].number} / {parts[part + 1].zh} →</button>}</footer>
    </main>}

    {activeCertificate !== null && <div className="archive-lightbox certificate-lightbox" role="dialog" aria-modal="true" aria-label="竞赛证书放大查看" onClick={() => setActiveCertificate(null)}><button className="lightbox-close" onClick={() => setActiveCertificate(null)}>关闭 / CLOSE ×</button><img src="/media/profile/certificate-wall.jpg" alt="完整竞赛证书合集放大图" decoding="async" onClick={event => event.stopPropagation()} /></div>}
    {activeExperience !== null && <div className="archive-lightbox activity-focus-lightbox" role="dialog" aria-modal="true" aria-label={`个人活动照片 ${activeExperience + 1} 放大查看`} onClick={() => setActiveExperience(null)}><button className="lightbox-close" onClick={() => setActiveExperience(null)}>关闭 / CLOSE ×</button><img src={activityPhotos[activeExperience]} alt={`个人活动经历照片 ${activeExperience + 1}`} onClick={event => event.stopPropagation()} /></div>}
  </div>;
}
