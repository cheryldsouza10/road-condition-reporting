import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadowUrl });
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    }
  });
  return null;
}

function MapComponent({ defects = [], onMapClick }) {
  const validDefects = Array.isArray(defects) ? defects : [];

  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validDefects.map((defect, index) => (
        <Marker
          key={index}
          position={[defect.location.lat, defect.location.lng]}
        >
          <Popup>{defect.type}</Popup>
        </Marker>
      ))}
      <LocationMarker onMapClick={onMapClick} />
    </MapContainer>
  );
}

export default MapComponent;
