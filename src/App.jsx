import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const[gameStart,setGameStart]=useState(true);
  const[best,setBest]=useState(0);
  
  const [index, setIndex] = useState(0);
  const [allGreen, setAllGreen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const[jumpStart,setJumpStart]=useState(false);


  const resetGame = () => {
    setIndex(0);
    setAllGreen(false);
    setStartTime(null);
    setReactionTime(null);
    setJumpStart(false);
    setGameStart(true);
  };

  useEffect(() => {
    if(!gameStart) return;
    let intervalId;
    let timeoutId;
    let greenLightTimeoutId;
    
    intervalId = setInterval(() => {
      setIndex(prev => prev + 1);
      
    }, 1000)
    
    timeoutId=setTimeout(() => {
      clearInterval(intervalId)
      greenLightTimeoutId = setTimeout(() => {
        setAllGreen(true);
        setStartTime(performance.now());
      }, ((Math.random() * (6-0.2))+0.2) * 1000);
      
    }, 5000);
    return () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    clearTimeout(greenLightTimeoutId);
  };

    
  }, [gameStart])

  

  useEffect(() => {
    const handleReaction = () => {
    if(!gameStart)
    {
      
      resetGame();
      return;
    }
    if (!startTime) {
      setJumpStart(true);
      setGameStart(false);
      
      return;
    }

    
    if (reactionTime === null) {
      const time = performance.now() - startTime;
      setReactionTime(time.toFixed(0));
      setGameStart(false);
      if(best === 0 || time < best){
          setBest(time.toFixed(0));
    }
    }
    
  };

    const handleKey = (e) => {
      if (e.code === 'Space') handleReaction();
    };

    window.addEventListener('click', handleReaction);
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('click', handleReaction);
      window.removeEventListener('keydown', handleKey);
    };
  }, [startTime, reactionTime,gameStart]);

  return (
    <div className='frame'>
      <div className='container'>
        <div className='col'>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${0 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${0 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>

        </div>
        <div className='col'>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${1 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${1 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>
        </div>
        <div className='col'>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${2 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${2 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>
        </div>
        <div className='col'>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${3 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${3 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>

        </div>
        <div className='col'>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${4 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>
          <div className={`lights ${4 < index ? 'red' : ''} ${allGreen ? 'green' : ''}`}></div>
        </div>
      </div>
      <div className='time'><h1>{jumpStart ? "Jump Start!!":reactionTime/1000.00+" s"}</h1></div>
      <div className='time best'><h2>{"Current best :"+best/1000.00+" s"}</h2></div>
    </div>
  )
}

export default App
