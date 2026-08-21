"use client";

import { useRef, useState } from "react";

type DiagramViewerProps = {
  src: string;
  alt: string;
  caption: string;
};

export function DiagramViewer({ src, alt, caption }: DiagramViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const close = () => {
    dialogRef.current?.close();
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <>
      <figure className="diagram-viewer">
        <button type="button" onClick={() => dialogRef.current?.showModal()} aria-label={`全屏查看${alt}`}>
          <img src={src} alt={alt} loading="lazy" decoding="async" />
          <span className="diagram-open">全屏查看 / 放大 ＋</span>
        </button>
        <figcaption>{caption}</figcaption>
      </figure>

      <dialog className="diagram-dialog" ref={dialogRef} onCancel={close}>
        <div className="diagram-toolbar">
          <span>{caption}</span>
          <div>
            <button type="button" onClick={() => setScale((value) => Math.max(1, value - 0.25))} aria-label="缩小">−</button>
            <span>{Math.round(scale * 100)}%</span>
            <button type="button" onClick={() => setScale((value) => Math.min(3, value + 0.25))} aria-label="放大">＋</button>
            <button type="button" onClick={close}>关闭</button>
          </div>
        </div>
        <div
          className="diagram-stage"
          onPointerDown={(event) => {
            drag.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!drag.current || scale === 1) return;
            setOffset({
              x: drag.current.ox + event.clientX - drag.current.x,
              y: drag.current.oy + event.clientY - drag.current.y,
            });
          }}
          onPointerUp={() => { drag.current = null; }}
          onDoubleClick={() => setScale((value) => value === 1 ? 2 : 1)}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})` }}
            draggable={false}
          />
        </div>
      </dialog>
    </>
  );
}
