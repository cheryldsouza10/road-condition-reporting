import React, { useState } from 'react';

function DefectForm({ onSubmit, onCancel }) {
  const [selectedType, setSelectedType] = useState('Pothole');

  return (
    <div className="form-modal">
      <h3>Report Defect</h3>
      <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
        <option value="Pothole">Pothole</option>
        <option value="Crack">Crack</option>
        <option value="Water Leak">Water Leak</option>
      </select>
      <div className="form-buttons">
        <button onClick={() => onSubmit(selectedType)}>Submit</button>
        <button className="cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DefectForm;