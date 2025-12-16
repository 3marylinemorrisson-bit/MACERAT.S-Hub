import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <header style={{ background: '#333', color: '#fff', padding: '10px' }}>
        <h1>MACERAT.S Admin</h1>
      </header>
      <main>{children}</main>
      <footer style={{ background: '#333', color: '#fff', padding: '10px', marginTop: '20px' }}>
        © 2025 MACERAT.S
      </footer>
    </div>
  );
}
