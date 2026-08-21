"use client";

import Link from "next/link";
import { useState } from "react";

type PaperViewerProps = {
  paper: { number: string; journal: string; pdf: string };
};

export function PaperViewer({ paper }: PaperViewerProps) {
  const [zoom, setZoom] = useState(100);
  const pdfSource = `${paper.pdf}#toolbar=0&navpanes=0&view=FitH&zoom=${zoom}`;

  return <main className="paper-viewer-shell">
    <header className="paper-viewer-header">
      <Link href={`/profile?part=1&paper=${paper.number}`}><b>← 返回论文情况</b><small>BACK TO PUBLICATIONS</small></Link>
      <p><b>论文 {paper.number}</b><small>PAPER {paper.number}</small></p>
      <p className="paper-journal"><b>{paper.journal}</b><small>JOURNAL</small></p>
    </header>
    <div className="paper-viewer-rule" aria-hidden="true"><span /></div>
    <section className="paper-reader" aria-label={`论文 ${paper.number} PDF 阅读器`}>
      <aside className="paper-reader-note"><span>{paper.number}</span><p>上下滚动阅读<br />SCROLL TO READ</p></aside>
      <div className="paper-frame-wrap"><iframe key={zoom} src={pdfSource} title={`论文 ${paper.number} 完整 PDF`} /></div>
      <aside className="paper-zoom" aria-label="PDF 缩放控制">
        <button type="button" onClick={() => setZoom(value => Math.min(180, value + 10))} aria-label="放大 PDF">＋</button>
        <output>{zoom}%</output>
        <button type="button" onClick={() => setZoom(value => Math.max(60, value - 10))} aria-label="缩小 PDF">−</button>
        <a href={paper.pdf} download>下载<small>DOWNLOAD</small></a>
      </aside>
    </section>
  </main>;
}
