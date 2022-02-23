import { useState, useEffect } from 'react'
import './App.css';

import Keyboard from './components/Keyboard';

function App() {
  const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => '')));
  const [current, setCurrent] = useState({ row: 0 })
  const [id, serId] = useState(crypto.randomUUID())

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/start-game/${id}`)
      const data = await response.json();
      console.log(data)
    })();
  }, []);



  const handLetter = (letter) => {
    let row = current.row
    let hayVacio = false
    let col = 0
    while (col < grid[row].length && !hayVacio) {
      if (grid[row][col] == "") {
        hayVacio = true
      }
      col++
    }

    switch (letter) {
      case "ENTER":
        // console.log(grid[row].join(""));
        handleEnter(hayVacio, grid[row].join(""))
        break
      case "DELETE":
        console.log("Falta implementar");
        break
      default:
        if (hayVacio) {
          let gridCopy = [...grid];
          gridCopy[row][col - 1] = letter
          setGrid(gridCopy)
        }
    }

  }
  const handleEnter = (hayVacio, word) => {
    if (hayVacio) {
      alert("Completa la palabra")
    } else {

      (async () => {
        const response = await fetch(`http://localhost:3001/check-word/${id}/${word}/`)
        const data = await response.json();
        console.log(data)
      })();


      if (current.row <= 4) {
        setCurrent({ row: current.row + 1 })
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
