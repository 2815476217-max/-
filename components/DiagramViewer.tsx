"use client";

import { useRef, useState } from "react";

type DiagramViewerProps = {
  src: string;
  alt: string;
  caption: string;
};

export function DiagramViewer({ src, alt, caption }: DiagramViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ distance: number; scale: number } | null>(null);

  const clampOffset = (next: { x: number; y: number }, nextScale = scale) => {
    const stage = stageRef.current;
    const image = imageRef.current;
    if (!stage || !image || nextScale <= 1) return { x: 0, y: 0 };
    const maxX = Math.max(0, (image.clientWidth * nextScale - stage.clientWidth) / 2);
    const maxY = Math.max(0, (image.clientHeight * nextScale - stage.clientHeight) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    };
  };

  const updateScale = (nextScale: number) => {
    const value = Math.max(1, Math.min(4, nextScale));
    setScale(value);
    setOffset((current) => clampOffset(current, value));
  };

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
            <button type="button" onClick={() => updateScale(scale - 0.25)} aria-label="缩小">−</button>
            <span>{Math.round(scale * 100)}%</span>
            <button type="button" onClick={() => updateScale(scale + 0.25)} aria-label="放大">＋</button>
            <button type="button" onClick={close}>关闭</button>
          </div>
        </div>
        <div
          className="diagram-stage"
          ref={stageRef}
          onWheel={(event) => {
            event.preventDefault();
            event.stopPropagation();
            updateScale(scale + (event.deltaY < 0 ? 0.2 : -0.2));
          }}
          onPointerDown={(event) => {
            pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
            event.currentTarget.setPointerCapture(event.pointerId);
            if (pointers.current.size === 1) {
              drag.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y };
            } else if (pointers.current.size === 2) {
              const [first, second] = [...pointers.current.values()];
              pinch.current = { distance: Math.hypot(second.x - first.x, second.y - first.y), scale };
              drag.current = null;
            }
          }}
          onPointerMove={(event) => {
            if (!pointers.current.has(event.pointerId)) return;
            pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
            if (pointers.current.size >= 2 && pinch.current) {
              const [first, second] = [...pointers.current.values()];
              const distance = Math.hypot(second.x - first.x, second.y - first.y);
              updateScale(pinch.current.scale * distance / Math.max(1, pinch.current.distance));
              return;
            }
            if (!drag.current || scale === 1) return;
            setOffset(clampOffset({
              x: drag.current.ox + event.clientX - drag.current.x,
              y: drag.current.oy + event.clientY - drag.current.y,
            }));
          }}
          onPointerUp={(event) => {
            pointers.current.delete(event.pointerId);
            pinch.current = null;
            const remaining = [...pointers.current.values()][0];
            drag.current = remaining ? { x: remaining.x, y: remaining.y, ox: offset.x, oy: offset.y } : null;
          }}
          onPointerCancel={(event) => {
            pointers.current.delete(event.pointerId);
            pinch.current = null;
            drag.current = null;
          }}
          onDoubleClick={() => {
            const next = scale === 1 ? 2 : 1;
            setScale(next);
            setOffset({ x: 0, y: 0 });
          }}
        >
          <img
            ref={imageRef}
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
