import { useEffect, useRef } from "react";
import L from "leaflet";
import { Waypoint } from "../types";

interface TrackingMapProps {
  route: Waypoint[];
  progress: number; // progress percentage (0 - 100)
}

export default function TrackingMap({ route, progress }: TrackingMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);
  const traveledLineRef = useRef<L.Polyline | null>(null);
  const truckMarkerRef = useRef<L.Marker | null>(null);

  // Calculate current coordinates based on progress percentage across multiple points
  const getTruckPosition = (prog: number): [number, number] => {
    if (route.length === 0) return [0, 0];
    if (prog <= 0) return [route[0].lat, route[0].lng];
    if (prog >= 100) return [route[route.length - 1].lat, route[route.length - 1].lng];

    const f = prog / 100;
    const decimalIndex = f * (route.length - 1);
    const indexFloor = Math.floor(decimalIndex);
    const fraction = decimalIndex - indexFloor;

    if (indexFloor >= route.length - 1) {
      return [route[route.length - 1].lat, route[route.length - 1].lng];
    }

    const pStart = route[indexFloor];
    const pEnd = route[indexFloor + 1];

    const lat = pStart.lat + fraction * (pEnd.lat - pStart.lat);
    const lng = pStart.lng + fraction * (pEnd.lng - pStart.lng);

    return [lat, lng];
  };

  // 1. Initialize Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Center map around Brazil middle
    const map = L.map(containerRef.current, {
      center: [-23.0, -51.0],
      zoom: 5,
      zoomControl: true,
      minZoom: 4,
      maxZoom: 12,
    });

    // Elegant Positron Light tile provider (looks amazing for sandboxed high contrast light dashboards)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Add Origin & Destination markers
    if (route.length > 0) {
      const originItem = route[0];
      const destItem = route[route.length - 1];

      // Custom Origin Marker using Tailwind
      const originIcon = L.divIcon({
        className: "custom-div-icon",
        html: `
          <div class="flex flex-col items-center">
            <div class="w-3.5 h-3.5 bg-blue-600 rounded-full border border-white flex items-center justify-center relative shadow-[0_0_8px_rgba(37,99,235,0.6)]">
              <div class="absolute -inset-1.5 bg-blue-600/30 rounded-full animate-ping"></div>
            </div>
            <div class="text-[9px] font-bold font-display bg-white border border-slate-200 text-blue-900 mt-1 px-1.5 rounded shadow-sm whitespace-nowrap leading-none py-1">
              ${originItem.state} - ${originItem.city} (Origem)
            </div>
          </div>
        `,
        iconSize: [120, 40],
        iconAnchor: [60, 6],
      });

      L.marker([originItem.lat, originItem.lng], { icon: originIcon }).addTo(map);

      // Custom Destination Marker using Tailwind
      const destIcon = L.divIcon({
        className: "custom-div-icon",
        html: `
          <div class="flex flex-col items-center">
            <div class="w-3.5 h-3.5 bg-slate-600 rounded-full border border-white flex items-center justify-center relative shadow-[0_0_8px_rgba(100,116,139,0.6)]">
              <div class="absolute -inset-1 bg-slate-400/20 rounded-full animate-pulse"></div>
            </div>
            <div class="text-[9px] font-bold font-display bg-white border border-slate-200 text-slate-700 mt-1 px-1.5 rounded shadow-sm whitespace-nowrap leading-none py-1">
              ${destItem.state} - ${destItem.city} (Destino)
            </div>
          </div>
        `,
        iconSize: [120, 40],
        iconAnchor: [60, 6],
      });

      L.marker([destItem.lat, destItem.lng], { icon: destIcon }).addTo(map);
    }

    // Force map size recalculation inside React standard layout
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 2. Update Map Layers on Route details or Progress change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || route.length === 0) return;

    // Convert waypoints array to LatLng coordinates
    const latLngs = route.map((item) => L.latLng(item.lat, item.lng));

    // Draw total route (faded background path)
    if (routeLineRef.current) {
      routeLineRef.current.setLatLngs(latLngs);
    } else {
      routeLineRef.current = L.polyline(latLngs, {
        color: "#475569", // slate-600
        opacity: 0.4,
        weight: 3.5,
        dashArray: "6, 6",
      }).addTo(map);
    }

    // Calculate current truck coordinates
    const truckPos = getTruckPosition(progress);

    // Draw traveled part of route
    const traveledPoints: L.LatLng[] = [];
    const f = progress / 100;
    const decimalIndex = f * (route.length - 1);
    const indexFloor = Math.floor(decimalIndex);

    for (let i = 0; i <= indexFloor; i++) {
      traveledPoints.push(L.latLng(route[i].lat, route[i].lng));
    }
    // Append the exact interpolated truck coordinates to have seamless curve tracking
    traveledPoints.push(L.latLng(truckPos[0], truckPos[1]));

    if (traveledLineRef.current) {
      traveledLineRef.current.setLatLngs(traveledPoints);
    } else {
      traveledLineRef.current = L.polyline(traveledPoints, {
        color: "#3b82f6", // blue-500
        opacity: 0.85,
        weight: 4,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
    }

    // Custom Live Cargo truck marker
    const truckIcon = L.divIcon({
      className: "custom-div-icon",
      html: `
        <div class="flex flex-col items-center">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-700 to-cyan-500 text-white flex items-center justify-center border-2 border-white shadow-[0_0_12px_rgba(6,182,212,0.4)] relative">
            <div class="absolute -inset-1.5 bg-cyan-500/30 rounded-full animate-ping"></div>
            <!-- Standard truck SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <div class="text-[8px] font-extrabold font-mono tracking-wider bg-cyan-600 text-white px-1.5 mt-0.5 rounded shadow whitespace-nowrap uppercase border border-cyan-400">
            Caminhão (${progress.toFixed(0)}%)
          </div>
        </div>
      `,
      iconSize: [60, 48],
      iconAnchor: [30, 16],
    });

    if (truckMarkerRef.current) {
      truckMarkerRef.current.setLatLng(truckPos);
      truckMarkerRef.current.setIcon(truckIcon);
    } else {
      truckMarkerRef.current = L.marker(truckPos, { icon: truckIcon }).addTo(map);
    }

    // Dynamic map camera pan to keep truck focused if user wants,
    // or fitbounds on initial load. Let's do fit bounds on initial, and soft pan as it moves.
    const isInitial = progress <= 4;
    if (isInitial) {
      map.fitBounds(L.latLngBounds(latLngs), {
        padding: [30, 30],
        maxZoom: 7,
      });
    } else {
      // Smoothly pan camera only if map zooming is not currently locked or zoomed by user
      // Standard gentle follow
      map.panTo(truckPos, { animate: true, duration: 0.5 });
    }
  }, [progress, route]);

  // Handle map resizing
  const fitWholeMap = () => {
    const map = mapRef.current;
    if (!map || route.length === 0) return;
    const latLngs = route.map((item) => L.latLng(item.lat, item.lng));
    map.fitBounds(L.latLngBounds(latLngs), { padding: [50, 50] });
  };

  return (
    <div className="relative w-full h-full rounded-xl border border-slate-200 bg-[#f1f5f9] overflow-hidden shadow-sm group">
      {/* Map Element */}
      <div id="map-canvas" ref={containerRef} className="w-full h-full z-10" />

      {/* Map Control Buttons overlay (top right layout) */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 shadow-sm">
        <button
          onClick={fitWholeMap}
          className="bg-white/95 text-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-blue-900 transition duration-200 font-bold tracking-tight flex items-center gap-1 backdrop-blur-sm shadow-sm cursor-pointer"
          title="Ver o trajeto completo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
          Ver Rota Inteira
        </button>
      </div>

      {/* Mini status overlay left corner */}
      <div className="absolute bottom-3 left-3 z-20 bg-white/95 border border-slate-200 rounded-xl p-3 shadow-sm max-w-[200px] text-[10px] space-y-1 backdrop-blur-sm">
        <div className="text-slate-400 font-bold uppercase tracking-wider">Último Sinal GPS:</div>
        <div className="text-emerald-600 font-bold flex items-center gap-1 font-mono">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
          Ativo / Transmitindo
        </div>
        <div className="text-slate-600">
          Carreta a{" "}
          <span className="text-blue-600 font-mono font-bold">~80 km/h</span>
        </div>
      </div>
    </div>
  );
}
