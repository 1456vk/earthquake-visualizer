import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Legend from "./components/Legend";
import LoadingSpinner from "./components/LoadingSpinner";  // ✅ Add this

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      )
      .then((res) => {
        setEarthquakes(res.data.features);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("⚠ Failed to fetch earthquake data. Please try again later.");
        setLoading(false);
      });
  }, []);

  // ✅ Use Spinner
  if (loading) return <LoadingSpinner />;

  if (error)
    return <h2 style={{ color: "red", textAlign: "center" }}>{error}</h2>;

  return (
    <div className="App">
      <h1>Earthquake Visualizer 🌍</h1>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "90vh" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {earthquakes.map((eq) => {
          const [lng, lat, depth] = eq.geometry.coordinates;
          const mag = eq.properties.mag;
          return (
            <CircleMarker
              key={eq.id}
              center={[lat, lng]}
              radius={mag * 3}
              color={mag > 5 ? "red" : mag > 3 ? "orange" : "yellow"}
            >
              <Popup>
                <strong>Location:</strong> {eq.properties.place} <br />
                <strong>Magnitude:</strong> {mag} <br />
                <strong>Depth:</strong> {depth} km
              </Popup>
            </CircleMarker>
          );
        })}
        <Legend />
      </MapContainer>
    </div>
  );
}

export default App;
