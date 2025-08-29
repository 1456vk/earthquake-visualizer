# 🌍 Earthquake Visualizer

An interactive React web app that visualizes **real-time earthquake data** from the [USGS Earthquake API](https://earthquake.usgs.gov/).  
The app displays recent earthquake activity on an interactive **Leaflet map** with magnitude-based color coding, popups, and a legend.

---

## 🚀 Live Demo  
🔗 [Earthquake Visualizer on GitHub Pages](https://1456vk.github.io/earthquake-visualizer/)

---

## ✨ Features
- 📡 **Live Data** – Fetches earthquake data from the USGS GeoJSON API.  
- 🗺️ **Interactive Map** – Built with [React-Leaflet](https://react-leaflet.js.org/) and OpenStreetMap tiles.  
- 🎨 **Magnitude Color Coding** –  
  - Yellow → Magnitude ≤ 3  
  - Orange → Magnitude 3 - 5  
  - Red → Magnitude > 5  
- 📌 **Popups** – Show details like **location, magnitude, and depth**.  
- 📊 **Legend Component** – Explains the color coding on the map.  
- ⚠ **Error Handling** – Displays message if API fails.  

---

## 🛠️ Tech Stack
- **React 19** (with CRA)
- **React-Leaflet + Leaflet** (for maps)
- **Axios** (for API calls)
- **gh-pages** (for deployment)
- **HTML + CSS** (styling)

---

## 📂 Project Structure
