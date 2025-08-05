import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState(null);
  const [showingPunchline, setShowingPunchline] = useState(false);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    setJoke(null);
    const res = await fetch('http://localhost:3001/api/jokes');
    const data = await res.json();
    setJoke(data);
    setShowingPunchline(false);
  };

  const handleClick = () => {
    if (!joke) return;

    if (!showingPunchline) {
      setShowingPunchline(true);
    } else {
      fetchJoke();
    }
  };

  if (!joke) {
    return (
      <div className="loading">
        <div className="loading-line" style={{ width: '80%' }} />
        <div className="loading-line" style={{ width: '60%' }} />
        <div className="loading-line" style={{ width: '50%' }} />
      </div>
    );
  }

  return (
    <div className="joke-box" onClick={handleClick}>
      <div className="setup">{joke.setup}</div>
      {showingPunchline && <div className="punchline">{joke.punchline}</div>}
      <div className="hint">
        {showingPunchline ? 'Click for another joke' : 'Click to see punchline'}
      </div>
    </div>
  );
}

export default App;