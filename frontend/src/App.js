import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import './styles.css';

const MapComponent = React.lazy(() => import('./components/MapComponent'));
const Metrics = React.lazy(() => import('./components/Metrics'));
const DefectForm = React.lazy(() => import('./components/DefectForm'));

function App() {
  const [defects, setDefects] = useState([]);
  const [metrics, setMetrics] = useState({ total: 0, byType: {} });
  const [location, setLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const backendAPI = process.env.REACT_APP_BACKEND_URL;

  const fetchDefects = async () => {
    const res = await fetch(`${backendAPI}/api/defects`);
    const data = await res.json();
    setDefects(data);
  };

  const fetchMetrics = async () => {
    const res = await fetch(`${backendAPI}/api/defects/metrics`);
    const data = await res.json();
    setMetrics(data);
  };

  useEffect(() => {
    console.log(showForm);
    fetchDefects();
    fetchMetrics();
  }, []);

  const handleDefectSubmit = async (type) => {
    if (!location) return;
    await fetch(`${backendAPI}/api/defects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, location })
    });
    setShowForm(false);
    fetchDefects();
    fetchMetrics();
  };

  return (
    <div className="app">
      <Suspense fallback={<div>Loading Metrics...</div>}>
        <Metrics metrics={metrics} />
      </Suspense>

      <div className="map-container">
        <Suspense fallback={<div>Loading Map...</div>}>
          <MapComponent
            defects={defects}
            onMapClick={(loc) => {
              setLocation(loc);
              setShowForm(true);
            }}
          />
        </Suspense>

        {showForm && (
          <div className="modal-overlay">
            <Suspense fallback={<div>Loading Form...</div>}>
              <DefectForm
                onSubmit={handleDefectSubmit}
                onCancel={() => setShowForm(false)}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;