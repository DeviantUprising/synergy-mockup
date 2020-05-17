// External imports
import React, { CSSProperties } from 'react';

// Presentation imports
import Orchestrator from '@presentation-components/orchestrator/Orchestrator';

function App() {
  const divStyle: CSSProperties = {
    width: '100vw',
    height: '100vh',
  };

  return (
    <div style={divStyle}>
      <Orchestrator />
    </div>
  );
}

export default App;
