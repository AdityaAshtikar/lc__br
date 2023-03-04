import { useEffect } from 'react';
import Landing from './components/Landing';
import { runChannelReceiver } from './components/runChannel';

function App() {
  useEffect(() => {
    runChannelReceiver()
  }, []);

  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App;
