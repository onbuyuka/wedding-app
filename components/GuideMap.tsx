import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { GuideItem } from '../types';

interface GuideMapProps {
  items: GuideItem[];
  /** Accent color used for the markers + highlights. */
  accent?: string;
  /** Optional explicit center; otherwise auto-fits to markers. */
  center?: [number, number];
  /** Optional explicit zoom (used when `center` is provided). */
  zoom?: number;
  /** Optional fixed height (px) for the side-by-side area. */
  heightPx?: number;
  whereLabel: string;
  openInMapsLabel: string;
  sinceLabel: string;
}

type Pinnable = GuideItem & { coords: [number, number] };

const buildIcon = (accent: string, label: string, active: boolean) =>
  L.divIcon({
    className: `guide-pin${active ? ' is-active' : ''}`,
    html: `
      <div class="dot" style="
        background: ${accent};
        --pin-color: ${accent};
        --pin-halo: ${accent}33;
      ">${label}</div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });

interface MapControllerProps {
  selected: Pinnable | null;
  selectedIndex: number | null;
  defaultCenter: [number, number];
  defaultZoom: number;
  defaultBounds: L.LatLngBounds | null;
  popupRefs: React.MutableRefObject<Record<number, L.Popup | null>>;
}

/** Pans the map and opens the selected marker's popup. Lives inside MapContainer. */
const MapController: React.FC<MapControllerProps> = ({
  selected,
  selectedIndex,
  defaultCenter,
  defaultZoom,
  defaultBounds,
  popupRefs,
}) => {
  const map = useMap();

  // Track whether we've ever had a selection. Skip the default flyToBounds on
  // initial mount — the MapContainer's `bounds` prop already handles the
  // initial fit, and animating before the container is measured can leave the
  // map zoomed out to empty sea.
  const hadSelectionRef = useRef(false);

  // Leaflet measures its container at mount time. If the container's final size
  // isn't ready yet (flex/grid, fonts, images), tiles only render in a strip.
  // Force a re-measure once mounted and whenever the container resizes.
  // Also re-apply the default bounds after each invalidate, so the wide
  // regional fit sticks even if the initial fitBounds happened against a
  // 0-sized container.
  useEffect(() => {
    const container = map.getContainer();
    const refit = () => {
      map.invalidateSize();
      if (!hadSelectionRef.current && defaultBounds) {
        try {
          map.fitBounds(defaultBounds, { padding: [60, 60], animate: false });
        } catch {
          /* ignore */
        }
      }
    };
    const timers = [50, 200, 500, 1000].map((ms) => window.setTimeout(refit, ms));
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(container);
    return () => {
      timers.forEach(window.clearTimeout);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (!selected) {
      if (!hadSelectionRef.current) return;
      hadSelectionRef.current = false;
      try {
        if (defaultBounds) {
          map.flyToBounds(defaultBounds, { padding: [60, 60], duration: 0.8 });
        } else {
          map.flyTo(defaultCenter, defaultZoom, { duration: 0.8 });
        }
      } catch {
        // Leaflet can throw if the container is mid-teardown; ignore.
      }
      return;
    }
    hadSelectionRef.current = true;
    try {
      map.flyTo(selected.coords, Math.max(map.getZoom(), 14), { duration: 0.7 });
    } catch {
      // ignore
    }
    if (selectedIndex != null) {
      const t = setTimeout(() => {
        try {
          const popup = popupRefs.current[selectedIndex];
          // Guard: ref may be stale or map may have been removed during the flyTo animation.
          if (popup && (map as L.Map & { _container?: HTMLElement })._container) {
            popup.openOn(map);
          }
        } catch {
          // Popups can throw mid-animation; swallow to avoid crashing the page.
        }
      }, 250);
      return () => clearTimeout(t);
    }
  }, [selected, selectedIndex, map, defaultCenter, defaultZoom, defaultBounds, popupRefs]);
  return null;
};

interface SidePanelCardProps {
  item: Pinnable;
  index: number;
  active: boolean;
  accent: string;
  whereLabel: string;
  onHover: (idx: number | null) => void;
  onSelect: (idx: number) => void;
}

const SidePanelCard: React.FC<SidePanelCardProps> = ({
  item,
  index,
  active,
  accent,
  whereLabel,
  onHover,
  onSelect,
}) => (
  <button
    type="button"
    onMouseEnter={() => onHover(index)}
    onMouseLeave={() => onHover(null)}
    onFocus={() => onHover(index)}
    onBlur={() => onHover(null)}
    onClick={() => onSelect(index)}
    className={`group w-full text-left flex gap-3 p-3 rounded-xl transition-all duration-200 ${
      active
        ? 'bg-white shadow-md ring-1 ring-stone-200 scale-[1.01]'
        : 'bg-transparent hover:bg-white/70 hover:shadow-sm'
    }`}
  >
    <div className="relative shrink-0">
      <div
        className="w-14 h-14 rounded-lg bg-stone-200 overflow-hidden"
        style={{ boxShadow: active ? `0 0 0 2px ${accent}` : undefined }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-serif text-stone-400 text-lg"
            aria-hidden="true"
          >
            {index + 1}
          </div>
        )}
      </div>
      <span
        className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-[10px] font-serif font-semibold text-white flex items-center justify-center ring-2 ring-white"
        style={{ background: accent }}
      >
        {index + 1}
      </span>
    </div>
    <div className="min-w-0 flex-1">
      <div className="font-serif text-base text-stone-900 leading-tight truncate">{item.name}</div>
      <div className="text-[11px] uppercase tracking-wider text-stone-400 mt-1 truncate">
        {whereLabel} · {item.whereName}
      </div>
    </div>
  </button>
);

const GuideMap: React.FC<GuideMapProps> = ({
  items,
  accent = '#e11d48',
  center,
  zoom,
  heightPx = 560,
  whereLabel,
  openInMapsLabel,
  sinceLabel,
}) => {
  const pinnable = useMemo(
    () => items.filter((it): it is Pinnable => Array.isArray(it.coords)),
    [items],
  );

  const bounds = useMemo(() => {
    if (!pinnable.length) return null;
    return L.latLngBounds(pinnable.map((it) => it.coords));
  }, [pinnable]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const activeIndex = hoverIndex ?? selectedIndex;
  const popupRefs = useRef<Record<number, L.Popup | null>>({});
  const listRef = useRef<HTMLDivElement | null>(null);

  // Scroll the corresponding card into view when selection changes from the map.
  useEffect(() => {
    if (selectedIndex == null || !listRef.current) return;
    const child = listRef.current.querySelector<HTMLElement>(
      `[data-card-idx="${selectedIndex}"]`,
    );
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedIndex]);

  if (!pinnable.length) return null;

  const defaultCenter: [number, number] =
    center ?? [
      (bounds!.getNorth() + bounds!.getSouth()) / 2,
      (bounds!.getEast() + bounds!.getWest()) / 2,
    ];
  const defaultZoom = zoom ?? 12;
  const selected = selectedIndex != null ? pinnable[selectedIndex] : null;

  return (
    <div
      className="guide-map-wrap relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-stone-200 bg-gradient-to-br from-stone-50 to-stone-100"
      style={{ height: heightPx, isolation: 'isolate' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] h-full min-h-0">
        {/* Side panel (desktop) */}
        <aside className="hidden md:flex flex-col min-h-0 border-r border-stone-200/80 bg-gradient-to-b from-white/90 to-stone-50/90 backdrop-blur-sm">
          <header className="px-5 pt-5 pb-3 border-b border-stone-200/70">
            <div
              className="inline-block text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${accent}15`, color: accent }}
            >
              {pinnable.length} {pinnable.length === 1 ? 'spot' : 'spots'}
            </div>
            <p className="text-[11px] text-stone-400 mt-3 leading-relaxed">
              Hover a card to preview, or click to zoom in.
            </p>
          </header>
          <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
            {pinnable.map((item, idx) => (
              <div key={`${item.name}-${idx}`} data-card-idx={idx}>
                <SidePanelCard
                  item={item}
                  index={idx}
                  active={activeIndex === idx}
                  accent={accent}
                  whereLabel={whereLabel}
                  onHover={setHoverIndex}
                  onSelect={(i) => setSelectedIndex(i === selectedIndex ? null : i)}
                />
              </div>
            ))}
          </div>
        </aside>

        {/* Map */}
        <div className="relative h-full">
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            bounds={center ? undefined : bounds!}
            boundsOptions={{ padding: [60, 60] }}
            scrollWheelZoom={false}
            zoomControl
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              subdomains={['a', 'b', 'c', 'd']}
            />
            {pinnable.map((item, idx) => (
              <Marker
                key={`${item.name}-${idx}`}
                position={item.coords}
                icon={buildIcon(accent, String(idx + 1), activeIndex === idx)}
                eventHandlers={{
                  click: () => setSelectedIndex(idx),
                  mouseover: () => setHoverIndex(idx),
                  mouseout: () => setHoverIndex(null),
                }}
              >
                <Popup
                  ref={(ref) => {
                    popupRefs.current[idx] = ref as unknown as L.Popup | null;
                  }}
                  closeButton
                  autoPan
                  autoPanPadding={[40, 40]}
                >
                  <article className="font-sans">
                    {item.image ? (
                      <div className="relative h-36 bg-stone-200">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
                        <div className="absolute left-3 bottom-2 right-3">
                          <h4 className="font-serif text-white text-lg leading-tight drop-shadow">
                            {item.name}
                          </h4>
                        </div>
                      </div>
                    ) : (
                      <div className="px-4 pt-4">
                        <h4 className="font-serif text-stone-900 text-lg leading-tight">
                          {item.name}
                        </h4>
                      </div>
                    )}
                    <div className="p-4 pt-3">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className="text-[10px] uppercase tracking-[0.18em] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: `${accent}15`, color: accent }}
                        >
                          {item.whereName}
                        </span>
                        {item.sinceYear && (
                          <span className="text-[10px] uppercase tracking-[0.18em] text-stone-400">
                            {sinceLabel} {item.sinceYear}
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-stone-600 leading-relaxed mb-3 line-clamp-4">
                        {item.description}
                      </p>
                      <a
                        href={item.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] font-semibold pb-0.5 border-b transition-colors"
                        style={{ color: accent, borderColor: `${accent}55` }}
                      >
                        {openInMapsLabel}
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </article>
                </Popup>
              </Marker>
            ))}
            <MapController
              selected={selected}
              selectedIndex={selectedIndex}
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
              defaultBounds={center ? null : bounds}
              popupRefs={popupRefs}
            />
          </MapContainer>

          {/* Mobile-only count chip overlaid on map */}
          <div className="md:hidden absolute top-3 left-3 z-[400]">
            <div
              className="text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur bg-white/90"
              style={{ color: accent }}
            >
              {pinnable.length} {pinnable.length === 1 ? 'spot' : 'spots'}
            </div>
          </div>

          {/* Reset framing button */}
          {selectedIndex != null && (
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-3 right-3 z-[400] text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur bg-white/90 text-stone-600 hover:text-stone-900 transition-colors"
            >
              Reset view
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideMap;
