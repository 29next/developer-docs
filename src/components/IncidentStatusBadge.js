import React, { useEffect, useState } from 'react';

const STATUS_URL = 'https://status.nextcommerce.com/api/v1/summary';
const STATUS_PAGE_URL = 'https://status.nextcommerce.com/';

const getStatus = (data) => {
  const { ongoing_incidents, in_progress_maintenances, scheduled_maintenances } = data;

  if (ongoing_incidents.length > 0) {
    return { text: 'Active incident in progress', color: '#FFA500' }; // orange
  }

  if (in_progress_maintenances.length > 0) {
    return { text: 'Performing scheduled maintenance', color: '#FFA500' }; // orange
  }

  if (scheduled_maintenances.length > 0) {
    return { text: 'Upcoming schedule maintenance', color: '#007BFF' }; // blue
  }

  return { text: 'All systems normal', color: '#00d97e' }; // green
};

const dotStyle = (color) => ({
  height: '10px',
  width: '10px',
  backgroundColor: color,
  borderRadius: '50%',
  display: 'inline-block',
  marginRight: '0.5em',
  boxShadow: `0 0 3px 2px ${color}`, // glow effect
});

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.4em 0.8em',
  borderRadius: '9px',
  border: '1px solid #e0e0e060',
  fontSize: '0.875rem',
  fontWeight: 500,
  backgroundColor: '#2b2b2b',
  textDecoration: 'none',
  color: '#fff',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

const IncidentStatusBadge = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch(STATUS_URL)
      .then((res) => res.json())
      .then((data) => setStatus(getStatus(data)))
      .catch((err) => console.error('Failed to load status:', err));
  }, []);

  if (!status) return null;

  return (
    <a href={STATUS_PAGE_URL} target="_blank" rel="noopener noreferrer" style={badgeStyle}>
      <span style={dotStyle(status.color)}></span>
      {status.text}
    </a>
  );
};

export default IncidentStatusBadge;