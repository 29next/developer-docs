import React from 'react';
import Footer from '@theme-original/Footer';
import IncidentStatusBadge from '../../components/IncidentStatusBadge';

export default function FooterWrapper(props) {
  return (
    <>
      <div style={{ backgroundColor: '#000', textAlign: 'center', padding: '2em' }}>
        <IncidentStatusBadge />
      </div>
      <Footer {...props}></Footer>
    </>
  );
}
