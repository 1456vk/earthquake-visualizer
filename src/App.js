import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Legend from './components/Legend';
import './components/LoadingSpinner.css';
import './App.css';

const USGS_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export default function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [minMag, setMinMag] = useState(0); // simple filter

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr('');
    axios
      .get(USGS_URL, { timeout: 15000 })
      .then((res) => {
        if (cancelled) return;
        setEarthquakes(res.data?.features ?? []);
      })
      .catch(() => {
        if (cancelled) return;
        setErr('Failed to load earthquake data. Please try again.');
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => earthquakes.filter((f) => (f.properties.mag ?? 0) >= minMag),
    [earthquakes, minMag]
  );

  const colorForMag = (m) => {
    if (m >= 6) return '#d73027';
    if (m >= 5) return '#fc8d59';
    if (m >= 4) return '#fee08b';
    if (m >= 3) return '#d9ef8b';
    if (m >= 2) return '#91cf60';
    return '#1a9850';
  };

  if (loading) {
    return (
      <div className="page">
        <header className="header">
          <h1>Earthquake Visualizer 🌍</h1>
        </header>
        <div className="center">
          <div className="spinner" />
          <p>Loading latest earthquakes…</p>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="page">
        <header className="header">
          <h1>Earthquake Visualizer 🌍</h1>
        </header>
        <div className="center">
          <p className="error">{err}</p>
          <button className="btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Earthquake Visualizer 🌍</h1>
        <div className="controls">
          <label>
            Min Magnitude: <strong>{minMag.toFixed(1)}</strong>
          </label>
          <input
            type="range"
            min={0}
            max={7}
            step={0.1}
            value={minMag}
            onChange={(e) => setMinMag(Number(e.target.value))}
          />
          <span className="count">{filtered.length} events</span>
        </div>
      </header>

      <div className="mapWrap">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          minZoom={2}
          worldCopyJump
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          />

          {filtered.map((eq) => {
            const [lng, lat, depth] = eq.geometry.coordinates;
            const mag = eq.properties.mag ?? 0;
            const radius = Math.max(4, mag * 3.2); // visible on zoom 2
            return (
              <CircleMarker
                key={eq.id}
                center={[lat, lng]}
                radius={radius}
                pathOptions={{ color: colorForMag(mag), fillOpacity: 0.6 }}
              >
                <Popup>
                  <div style={{ lineHeight: 1.4 }}>
                    <strong>{eq.properties.place || 'Unknown location'}</strong>
                    <br />
                    <strong>Magnitude:</strong> {mag}
                    <br />
                    <strong>Depth:</strong> {depth} km
                    <br />
                    <a
                      href={eq.properties.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Details (USGS)
                    </a>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        <Legend />
      </div>

      <footer className="footer">
        Data: <a href="https://earthquake.usgs.gov/" target="_blank" rel="noopener noreferrer">USGS</a> • Tiles:&nbsp;
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
        >
          © OpenStreetMap
        </a>{' '}
        contributors
      </footer>
    </div>
  );
}
