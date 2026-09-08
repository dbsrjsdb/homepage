'use client';
import { useEffect, useRef, useState } from 'react';

export function ScriptApp({ slug, title }: { slug: string; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(800);
  useEffect(() => {
    function resize(event: MessageEvent) {
      if (
        event.origin !== location.origin ||
        event.source !== frame.current?.contentWindow
      )
        return;
      if (
        event.data?.type === 'scriptapp:height' &&
        Number.isFinite(event.data.height)
      ) {
        setHeight(Math.min(16000, Math.max(240, event.data.height)));
      }
    }
    window.addEventListener('message', resize);
    frame.current?.contentWindow?.postMessage(
      { type: 'scriptapp:measure' },
      location.origin,
    );
    return () => window.removeEventListener('message', resize);
  }, []);
  return (
    <iframe
      ref={frame}
      className="script-frame"
      title={title}
      onLoad={() =>
        frame.current?.contentWindow?.postMessage(
          { type: 'scriptapp:measure' },
          location.origin,
        )
      }
      src={`/embedded/apps/${slug}/index.html`}
      style={{ height }}
      allow="microphone; clipboard-write; fullscreen"
    />
  );
}
