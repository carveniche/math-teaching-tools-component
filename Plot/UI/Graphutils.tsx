import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

// ─────────────────────────────────────────────────────────────────
// getFullscreenRoot
// Returns the current fullscreen element (if any) so the portal
// can be rendered inside it. When in fullscreen, `position:fixed`
// is relative to the fullscreen element, NOT the screen viewport,
// but getBoundingClientRect() is still relative to the screen
// viewport — we correct for this offset below.
// ─────────────────────────────────────────────────────────────────
function getFullscreenRoot(): Element {
  return (
    document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement ||
    document.body
  );
}

// ─────────────────────────────────────────────────────────────────
// PortalDropdown
// Renders the option list into the fullscreen root (or document.body)
// so it is never clipped by any ancestor overflow:hidden.
// Positions itself under the trigger using getBoundingClientRect,
// corrected for any fullscreen container offset.
//
// NO backdrop div — outside-close is handled entirely by the
// mousedown + touchstart listeners in useDropdown. A backdrop was
// intercepting clicks/taps before the <li> onClick could fire.
// ─────────────────────────────────────────────────────────────────

interface PortalDropdownProps {
  triggerRef: React.RefObject<HTMLDivElement>;
  options: (number | string)[];
  fs: number;
  onSelect: (val: number | string) => void;
  onClose: () => void;
}

export const PortalDropdown: React.FC<PortalDropdownProps> = ({
  triggerRef,
  options,
  fs,
  onSelect,
  onClose,
}) => {
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const [portalRoot, setPortalRoot] = useState<Element>(document.body);

  const measure = () => {
    if (!triggerRef.current) return;

    const root = getFullscreenRoot();
    setPortalRoot(root);

    const triggerRect = triggerRef.current.getBoundingClientRect();

    // When fullscreen is active the fixed-position coordinate system
    // originates from the top-left of the fullscreen element, not the
    // screen. Subtract the container's own offset to compensate.
    let offsetTop  = 0;
    let offsetLeft = 0;
    if (root !== document.body) {
      const rootRect = root.getBoundingClientRect();
      offsetTop  = rootRect.top;
      offsetLeft = rootRect.left;
    }

    setPos({
      top:   triggerRect.bottom - offsetTop  + 2,
      left:  triggerRect.left   - offsetLeft,
      width: triggerRect.width,
    });
  };

  useEffect(() => {
    measure();
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    document.addEventListener('fullscreenchange',       measure);
    document.addEventListener('webkitfullscreenchange', measure);
    return () => {
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
      document.removeEventListener('fullscreenchange',       measure);
      document.removeEventListener('webkitfullscreenchange', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRef]);

  if (!pos) return null;

  return ReactDOM.createPortal(
    <ul
      style={{
        position:        'fixed',
        top:             pos.top,
        left:            pos.left,
        width:           pos.width,
        zIndex:          99999,
        backgroundColor: '#fff',
        border:          '1px solid #0077BC',
        borderRadius:    8,
        listStyle:       'none',
        padding:         '4px 0',
        margin:          0,
        boxShadow:       '0 6px 20px rgba(0,0,0,0.18)',
        maxHeight:       160,
        overflowY:       'auto',
      }}
      onMouseDown={e => e.stopPropagation()}
      onTouchStart={e => e.stopPropagation()}
    >
      {options.map(option => (
        <li
          key={option}
          onClick={e => {
            e.stopPropagation();
            onSelect(option);
            onClose();
          }}
          style={{
            padding:    '5px 14px',
            fontSize:   fs,
            fontWeight: 500,
            cursor:     'pointer',
            textAlign:  'center',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#BBF8FF')}
          onMouseOut={e  => (e.currentTarget.style.background = '#fff')}
        >
          {option}
        </li>
      ))}
    </ul>,
    portalRoot
  );
};

// ─────────────────────────────────────────────────────────────────
// useDropdown
// Manages open/close state + outside-click/tap handling for N
// dropdowns.
// Listens to mousedown (desktop) AND touchstart (iPad / mobile).
// The PortalDropdown <ul> calls stopPropagation on both of these
// so interacting inside the list never triggers this handler.
// ─────────────────────────────────────────────────────────────────
export function useDropdown(count: number) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>(Array(count).fill(null));

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = ('touches' in e
        ? e.touches[0]?.target
        : e.target) as Node | null;
      if (!target) return;
      const clickedTrigger = triggerRefs.current.some(r => r?.contains(target));
      if (!clickedTrigger) setOpenIndex(null);
    };

    document.addEventListener('mousedown',  handler as EventListener);
    document.addEventListener('touchstart', handler as EventListener, { passive: true });

    return () => {
      document.removeEventListener('mousedown',  handler as EventListener);
      document.removeEventListener('touchstart', handler as EventListener);
    };
  }, []);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));
  const close  = () => setOpenIndex(null);

  return { openIndex, toggle, close, triggerRefs };
}

// ─────────────────────────────────────────────────────────────────
// useContainerSize
// Tracks width + height of a ref'd element via ResizeObserver.
// ─────────────────────────────────────────────────────────────────
export function useContainerSize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ w: 500, h: 600 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, [ref]);

  return size;
}