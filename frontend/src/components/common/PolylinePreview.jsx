import { useEffect, useState } from "react";
import "../../styles/polylinePreview.css";

export default function PolylinePreview({ routePath }) {
  if (!routePath || routePath.length === 0) return null;

  const latitudes = routePath.map((point) => point[0]);
  const longitudes = routePath.map((point) => point[1]);

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  const width = 100;
  const height = 100;

  const scaleX = width / (maxLng - minLng || 1);
  const scaleY = height / (maxLat - minLat || 1);

  const points = routePath
    .map(([lat, lng]) => {
      const x = (lng - minLng) * scaleX;
      const y = height - (lat - minLat) * scaleY;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="polyline-preview-svg">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <polyline points={points} className="glow-polyline" />
      </svg>
    </div>
  );
}
