// cliente/src/components/Header.js
import React from 'react';

const Header = () => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: 'white'
  };

  const buttonStyle = {
    padding: '8px 16px',
    fontSize: '16px',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <header style={headerStyle}>
      <h1>Sistema de Parqueadero</h1>
      <button style={buttonStyle} onClick={() => alert('Función de acceso de usuario no implementada.')}>
        👤 Acceso Usuario
      </button>
    </header>
  );
};

export default Header;