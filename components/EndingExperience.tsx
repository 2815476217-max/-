"use client";

import Link from "next/link";
import { useState, type CSSProperties, type MouseEvent } from "react";

export function EndingExperience() {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState<CSSProperties>({});
  const [recycling, setRecycling] = useState(false);

  function handleCardMove(event: MouseEvent<HTMLButtonElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    setTilt({ "--ending-tilt-x": `${-y * 5}deg`, "--ending-tilt-y": `${x * 7}deg` } as CSSProperties);
  }

  function backToTop() {
    if (recycling) return;
    setRecycling(true);
    window.setTimeout(() => window.location.assign("/profile"), 950);
  }

  return (
    <main className={`ending-page${recycling ? " is-recycling" : ""}`}>
      <nav className="part-index ending-part-index" aria-label="PROFILE 分区导航">
        <Link href="/profile?part=0"><span>01</span><i>个人档案</i></Link>
        <Link href="/profile?part=1"><span>02</span><i>论文情况</i></Link>
        <Link href="/profile?part=2"><span>03</span><i>竞赛获奖</i></Link>
        <Link href="/profile?part=3"><span>04</span><i>个人经历</i></Link>
        <Link href="/profile?part=4"><span>05</span><i>作品集</i></Link>
        <Link href="/ending" className="is-active" aria-current="page"><span>06</span><i>结尾</i></Link>
      </nav>
      <div className="part-progress ending-part-progress" aria-hidden="true"><span style={{ "--part-progress": "100%" } as CSSProperties} /></div>
      <div className="ending-line ending-line-top" aria-hidden="true" />
      <div className="ending-line ending-line-bottom" aria-hidden="true" />
      <div className="ending-orbits" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <span className="ending-coordinate ending-coordinate-a">N 31°13′17″</span>
      <span className="ending-coordinate ending-coordinate-b">E 121°28′ / ARCHIVE DATUM</span>

      <section className="ending-copy" aria-labelledby="ending-title">
        <p className="ending-kicker">PART 06｜结尾　ENDING</p>
        <h1 id="ending-title">设计仍在继续。</h1>
        <p className="ending-caption">THE ARCHIVE REMAINS OPEN.</p>
        <p className="ending-note">从真实场地出发，继续观察、研究与设计。<br /><small>From lived places, the next inquiry begins.</small></p>
      </section>

      <section className="ending-id-stage" aria-label="结尾设计师工作证">
        <div className="ending-lanyard" aria-hidden="true"><span /></div>
        <div className="ending-ring" aria-hidden="true" />
        <button
          type="button"
          className={`ending-id-card${flipped ? " is-flipped" : ""}`}
          style={tilt}
          onMouseMove={handleCardMove}
          onMouseLeave={() => setTilt({})}
          onClick={() => setFlipped((value) => !value)}
          aria-label={flipped ? "返回设计师签名正面" : "联系 / FLIP"}
        >
          <span className="ending-flip-hint">{flipped ? "签名 / FLIP ↻" : "联系 / FLIP ↻"}</span>
          <span className="ending-card-inner">
            <span className="ending-card-face ending-card-front">
              <img src="/media/profile-lifestyle.jpg" alt="冯驿岚" decoding="async" />
              <span className="ending-card-signature">
                <small>DESIGNER SIGNATURE · 01</small>
                <strong>冯 驿 岚 <em>LYNN</em></strong>
                <span>环境设计 / 景观设计<small>ENVIRONMENTAL / LANDSCAPE DESIGN</small></span>
                <b>PORTFOLIO <small>2023 — 2026</small></b>
              </span>
            </span>
            <span className="ending-card-face ending-card-back">
              <span className="ending-contact-head"><small>联系方式</small><strong>CONTACT</strong></span>
              <span className="ending-contact-row"><small>EMAIL</small><a href="mailto:2815476217@qq.com" onClick={(event) => event.stopPropagation()}>2815476217@qq.com</a></span>
              <span className="ending-contact-row"><small>PHONE</small><a href="tel:+8618773651385" onClick={(event) => event.stopPropagation()}>+86 18773651385</a></span>
              <span className="ending-contact-row"><small>WECHAT / SOCIAL</small><b>fffyl1007</b></span>
              <span className="ending-qr-placeholder"><img src="/media/ending-wechat-qr.jpg" alt="冯驿岚微信二维码，扫码添加好友" loading="lazy" decoding="async" /><small>微信 / WECHAT<br />扫码联系</small></span>
            </span>
          </span>
        </button>
      </section>

      <footer className="ending-footer">
        <Link href="/"><span>← 返回作品</span><small>BACK TO WORKS</small></Link>
        <button type="button" onClick={backToTop}><span>回到顶部 ↑</span><small>BACK TO TOP</small></button>
      </footer>
    </main>
  );
}
