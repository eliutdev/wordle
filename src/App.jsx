import { useState, useEffect } from 'react'
import './App.css';

import Keyboard from './components/Keyboard';

function App() {
  const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => '')));
  const [current, setCurrent] = useState({ row: 0, _col: 0 })

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/start-game/${crypto.randomUUID()}`)
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
        // setCurrent({ x: row, y: col })
        hayVacio = true
      }
      col++
    }


    switch (letter) {
      case "ENTER":
        if (hayVacio) {
          alert("Completa la palabra")
        } else {
          console.log("ok");
          if (row <= 4) {
            setCurrent({ row: current.row + 1 })
          }
        }


        break
      case "DELETE": console.log("enter");
        break
      default:


        if (hayVacio) {
          let gridCopy = [...grid];
          gridCopy[row][col - 1] = letter
          setGrid(gridCopy)
        }

    }

    // check row
    // while (row < grid.length && !encontrado) {
    //   if (grid[row][0] == "") {
    //     setCurrent({ row: row, col: current.y })
    //     encontrado = true
    //   } else {
    //     row++
    //   }

    // }


    // console.log(letter);
    // for (let y = 0; y < 6; y++) {
    //   for (let x = 0; x < 5; x++) {
    //     let aux = grid[y][x];
    //     grid[y][x] = !grid[y][x] ? letter : grid[y][x];
    //     if (!aux) break
    //   }
    // }
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
