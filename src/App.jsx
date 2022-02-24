import { useState, useEffect } from 'react'
import './App.css';

import Keyboard from './components/Keyboard';

function App() {
  const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => '')));
  const [gridColor, setGridColor] = useState(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => '')));
  const [current, setCurrent] = useState({ row: 0 })
  const [id, setId] = useState(crypto.randomUUID())
  const [win, setWin] = useState(false)
  const [wordle, setWordle] = useState("")

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/start-game/${id}`)
      const data = await response.json();
      console.log(data)
      if (data.result !== "fail")
        setWordle(data.word)
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
        if (current.row == 5) {
          alert("Has perdido")
        }
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
        console.log(data.data)

        if (data.result == "fail") {
          return
        }

        let gridColorTemp = [...gridColor]

        for (let j = 0; j < 5; j++) {
          gridColorTemp[current.row][j] = "gray"
        }
        for (let j = 0; j < data.data.yellow.length; j++) {
          const element = data.data.yellow[j];
          gridColorTemp[current.row][element] = "yellow"
        }
        for (let j = 0; j < data.data.green.length; j++) {
          const element = data.data.green[j];
          gridColorTemp[current.row][element] = "green"
        }
        console.log(gridColorTemp);
        setGridColor(gridColorTemp)

        if (data.data.green.length == 5) {
          setWin(true)
          alert("Has Ganado")
        }
      })();

      if (current.row <= 4 && !win) {
        setCurrent({ row: current.row + 1 })
      } else if (current.row == 5) {

      }
    }
  }

  return (
    <div className="app">
      <div className='info'>

        <h2 className='hint'>Pista: {wordle}</h2>
      </div>
      <div className='grid'>
        {grid.map((_, i) => (
          <div className="row" key={i}>
            {grid[i].map((_, j) => (
              <div
                className={`${(grid[i][j] ? 'col active' : 'col')} ${(gridColor[i][j] == "green" ? 'green' : '')}
                ${(gridColor[i][j] == "yellow" ? 'yellow' : '')} ${(gridColor[i][j] == "gray" ? 'gray' : '')}`} key={j}>{grid[i][j]} </div>
            ))}
          </div>
        ))}
      </div>
      <Keyboard onClick={handLetter} />
    </div>
  )
}

export default App
