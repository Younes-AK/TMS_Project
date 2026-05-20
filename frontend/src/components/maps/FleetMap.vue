<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import L, { type Map as LMap } from "leaflet";
import type { VehicleMarker } from "@/lib/mock-data";

const props = withDefaults(
  defineProps<{
    markers: VehicleMarker[];
    center?: [number, number];
    zoom?: number;
  }>(),
  { center: () => [40.7488, -73.9857], zoom: 12 }
);

const container = ref<HTMLDivElement | null>(null);
let map: LMap | null = null;
let markerLayer: L.LayerGroup | null = null;

const statusColor = (s: VehicleMarker["status"]) => {
  switch (s) {
    case "alert":   return "#EF4444";
    case "idle":    return "#FACC15";
    case "stopped": return "#6B6B7B";
    default:        return "#F5A623";
  }
};

const buildIcon = (m: VehicleMarker) => {
  const color = statusColor(m.status);
  const pulse = m.status === "alert" || m.status === "driving";
  const html = `
    <span class="fleet-marker" style="--c:${color}">
      ${pulse ? '<span class="fleet-marker__pulse"></span>' : ""}
      <span class="fleet-marker__dot"></span>
    </span>
  `;
  return L.divIcon({
    html,
    className: "fleet-marker-wrap",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
};

const render = () => {
  if (!map) return;
  if (markerLayer) markerLayer.clearLayers();
  else markerLayer = L.layerGroup().addTo(map);

  props.markers.forEach((m) => {
    const marker = L.marker([m.lat, m.lng], { icon: buildIcon(m) });
    marker.bindPopup(
      `<div style="font-family:Inter,sans-serif;color:#fff;min-width:160px">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#A0A0B0;margin-bottom:4px">
          ${m.plate}
        </div>
        <div style="font-size:14px;font-weight:600;margin-bottom:2px">${m.driver}</div>
        <div style="font-size:12px;color:#A0A0B0">
          <span style="text-transform:capitalize">${m.status}</span> · ${m.speed} km/h
        </div>
      </div>`
    );
    marker.addTo(markerLayer!);
  });
};

onMounted(() => {
  if (!container.value) return;
  map = L.map(container.value, {
    center: props.center,
    zoom: props.zoom,
    zoomControl: true,
    attributionControl: true,
  });

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
    }
  ).addTo(map);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 19,
      pane: "shadowPane",
      subdomains: "abcd",
      opacity: 0.6,
    }
  ).addTo(map);

  render();
});

watch(() => props.markers, render, { deep: true });

onBeforeUnmount(() => {
  map?.remove();
  map = null;
  markerLayer = null;
});
</script>

<template>
  <div ref="container" class="fleet-map h-full w-full" />
</template>

<style>
.fleet-map {
  background: #0f0f14;
  border-radius: 1rem;
  overflow: hidden;
}
.fleet-map .leaflet-control-zoom {
  border: 1px solid rgba(245, 166, 35, 0.2) !important;
  background: rgba(20, 20, 25, 0.85) !important;
  backdrop-filter: blur(8px);
}
.fleet-map .leaflet-control-zoom a {
  background: transparent !important;
  color: #ffb84d !important;
  border-color: rgba(245, 166, 35, 0.15) !important;
  font-weight: 600;
}
.fleet-map .leaflet-control-zoom a:hover {
  background: rgba(245, 166, 35, 0.12) !important;
  color: #ffffff !important;
}
.fleet-map .leaflet-control-attribution {
  background: rgba(10, 10, 15, 0.7) !important;
  color: #6b6b7b !important;
  font-size: 10px !important;
  backdrop-filter: blur(6px);
}
.fleet-map .leaflet-control-attribution a {
  color: #a0a0b0 !important;
}
.fleet-map .leaflet-popup-content-wrapper {
  background: rgba(20, 20, 25, 0.95) !important;
  color: #fff !important;
  border: 1px solid rgba(245, 166, 35, 0.25);
  border-radius: 10px !important;
  box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.7) !important;
  backdrop-filter: blur(12px);
}
.fleet-map .leaflet-popup-tip {
  background: rgba(20, 20, 25, 0.95) !important;
}
.fleet-map .leaflet-popup-content {
  margin: 10px 14px !important;
}
.fleet-map .leaflet-popup-close-button {
  color: #a0a0b0 !important;
}

.fleet-marker-wrap { background: transparent !important; border: none !important; }
.fleet-marker {
  position: relative;
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
}
.fleet-marker__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--c, #f5a623);
  box-shadow:
    0 0 0 2px rgba(10, 10, 15, 0.9),
    0 0 0 3px var(--c, #f5a623),
    0 0 12px rgba(245, 166, 35, 0.6);
}
.fleet-marker__pulse {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: var(--c, #f5a623);
  opacity: 0.45;
  animation: fleet-marker-pulse 2s ease-out infinite;
}
@keyframes fleet-marker-pulse {
  0%   { transform: scale(0.6); opacity: 0.55; }
  100% { transform: scale(2.6); opacity: 0; }
}
</style>
