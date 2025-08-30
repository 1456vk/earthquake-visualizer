import React from 'react';

const rows = [
  { color: '#d73027', label: '≥ 6.0' },
  { color: '#fc8d59', label: '5.0 – 5.9' },
  { color: '#fee08b', label: '4.0 – 4.9' },
  { color: '#d9ef8b', label: '3.0 – 3.9' },
  { color: '#91cf60', label: '2.0 – 2.9' },
  { color: '#1a9850', label: '< 2.0' },
];

export default function Legend() {
  return (
    <div className="legend">
      <div className="legend-title">Magnitude</div>
      {rows.map((r) => (
        <div className="legend-row" key={r.label}>
          <span className="legend-swatch" style={{ background: r.color }} />
          <span>{r.label}</span>
        </div>
      ))}
    </div>
  );
}