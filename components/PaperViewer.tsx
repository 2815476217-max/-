"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

type PaperViewerProps = {
  paper: { number: string; journal: string; pdf: string };
};

type PdfPageProps = {
  document: PDFDocumentProxy;
  pageNumber: number;
  width: number;
  zoom: number;
};

function PdfPage({ document, pageNumber, width, zoom }: PdfPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width <= 0) return;
    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<unknown> } | null = null;

    document.getPage(pageNumber).then((page) => {
      if (cancelled) return;
      const baseViewport = page.getViewport({ scale: 1 });
      const cssWidth = width * zoom / 100;
      const pageScale = cssWidth / baseViewport.width;
      const viewport = page.getViewport({ scale: pageScale });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      renderTask = page.render({
        canvas,
        canvasContext: context,
        viewport,
        transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
      });
      return renderTask.promise;
    }).catch((error) => {
      if (!cancelled && error?.name !== "RenderingCancelledException") console.error(error);
    });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [document, pageNumber, width, zoom]);

  return <figure className="paper-page" data-page-number={pageNumber} aria-label={`第 ${pageNumber} 页`}>
    <canvas ref={canvasRef} />
    <figcaption>{String(pageNumber).padStart(2, "0")}</figcaption>
  </figure>;
}

export function PaperViewer({ paper }: PaperViewerProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [readerWidth, setReaderWidth] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => setReaderWidth(Math.max(280, frame.clientWidth - 32));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let disposed = false;
    let loadingTask: { promise: Promise<PDFDocumentProxy>; destroy: () => Promise<void> } | null = null;
    let loadedDocument: PDFDocumentProxy | null = null;

    import("pdfjs-dist").then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      loadingTask = pdfjs.getDocument({
        url: paper.pdf,
        cMapUrl: "/pdfjs/cmaps/",
        cMapPacked: true,
        standardFontDataUrl: "/pdfjs/standard_fonts/",
      });
      return loadingTask.promise;
    }).then((pdf) => {
      loadedDocument = pdf;
      if (!disposed) {
        setDocument(pdf);
        setError(null);
      }
    }).catch((loadError) => {
      if (!disposed) setError(loadError instanceof Error ? loadError.message : "PDF 加载失败");
    });

    return () => {
      disposed = true;
      loadingTask?.destroy();
      loadedDocument?.destroy();
    };
  }, [paper.pdf]);

  return <main className="paper-viewer-shell">
    <header className="paper-viewer-header">
      <Link href={`/profile?part=1&paper=${paper.number}`}><b>← 返回论文情况</b><small>BACK TO PUBLICATIONS</small></Link>
      <p><b>论文 {paper.number}</b><small>PAPER {paper.number}</small></p>
      <p className="paper-journal"><b>{paper.journal}</b><small>JOURNAL</small></p>
    </header>
    <div className="paper-viewer-rule" aria-hidden="true"><span /></div>
    <section className="paper-reader" aria-label={`论文 ${paper.number} PDF 阅读器`}>
      <aside className="paper-reader-note"><span>{paper.number}</span><p>上下滚动阅读<br />SCROLL TO READ</p></aside>
      <div
        className="paper-frame-wrap"
        ref={frameRef}
        onWheel={(event) => event.stopPropagation()}
        onTouchStart={(event) => event.stopPropagation()}
        onTouchMove={(event) => event.stopPropagation()}
      >
        {!document && !error && <p className="paper-loading">论文加载中 / LOADING PAPER</p>}
        {error && <p className="paper-loading is-error">PDF 加载失败<br /><small>{error}</small></p>}
        {document && <div className="paper-pages" data-page-count={document.numPages}>
          {Array.from({ length: document.numPages }, (_, index) => <PdfPage key={index + 1} document={document} pageNumber={index + 1} width={readerWidth} zoom={zoom} />)}
        </div>}
      </div>
      <aside className="paper-zoom" aria-label="PDF 缩放控制">
        <button type="button" onClick={() => setZoom(value => Math.min(180, value + 10))} aria-label="放大 PDF">＋</button>
        <output>{zoom}%</output>
        <button type="button" onClick={() => setZoom(value => Math.max(60, value - 10))} aria-label="缩小 PDF">−</button>
        <a href={paper.pdf} download>下载<small>DOWNLOAD</small></a>
      </aside>
    </section>
  </main>;
}
