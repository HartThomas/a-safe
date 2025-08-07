import { useEffect, useState, useRef } from 'react';
import { useAnimationFrame } from "motion/react"
import './App.css';

function App() {
  const [joke, setJoke] = useState(null);
  const [showingPunchline, setShowingPunchline] = useState(false);
  const [showingJoke, setShowingJoke] = useState(false);
  const jokeBoxRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    const res = await fetch('http://localhost:3001/api/jokes');
    const data = await res.json();
    setJoke(data);
    setShowingJoke(true);
  };

  const handleClick = () => {
    if (!joke) return;

    if (!showingPunchline) {
      setShowingPunchline(true);
    } else {
      setShowingPunchline(false);
      setShowingJoke(false);
      setTimeout(() => {
        fetchJoke();
      }, 300);
    }
  };

  useAnimationFrame((time) => {
    if (containerRef.current) {
      const scale = 0.6 + 0.05 * Math.sin(time / 1000);
      containerRef.current.style.transform = `scale(${scale})`;
    }
  });

  return (
  <>
    <div className={`container`} ref={containerRef} onClick={handleClick}></div>
      <article className={`joke-box ${joke?'visible':'hidden'}`} ref={jokeBoxRef}>
        <section className={`${showingJoke ? 'visible' : 'hidden'}`}>
          <p className={`setup ${showingJoke? 'visible' : 'hidden'}`}>{joke ? joke.setup : ''}</p>
          <p className={`punchline ${showingPunchline? 'visible' : 'hidden'}`}>{joke ? joke.punchline : ''}</p>
        </section>
      </article>
  </>
  );
}

export default App;