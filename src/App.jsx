import { useState, useEffect } from 'react'
import './App.css';

import Keyboard from './components/Keyboard';

function App() {
  const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => '')));
  const [current, setCurrent] = useState({ x: 0, y: 0 })

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/start-game/${crypto.randomUUID()}`)
      const data = await response.json();
      console.log(data)
    })();
  }, []);

  const handLetter = (letter) => {
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 5; x++) {
        let aux = grid[y][x];
        grid[y][x] = !grid[y][x] ? letter : grid[y][x];
        if(!aux) break
      }
    }
  }

  return (
    <div className="app">
      <div className='grid'>
        {grid.map((_, i) => (
          <div className="row" key={i}>
            {grid[i].map((_, j) => (
              <div className={grid[i][j] ? 'col active' : 'col'} key={j}>{grid[i][j]}</div>
            ))}
          </div>
        ))}
      </div>
      <Keyboard onClick={handLetter} />
    </div>
  )
}

export default App
