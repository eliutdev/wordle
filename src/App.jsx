import { useState, useEffect } from "react";
import "./App.css";

import { Notify } from "@reliutg/buzz-notify";
import "@reliutg/buzz-notify/dist/buzz-notify.css";

import Keyboard from "./components/Keyboard";

function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ""))
  );
  const [gridColor, setGridColor] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ""))
  );
  const [current, setCurrent] = useState({ row: 0 });
  const [id] = useState(crypto.randomUUID());
  const [win, setWin] = useState(false);
  const [wordle, setWordle] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/api/start-game/${id}`
      );
      const data = await response.json();
      console.log(data);
      if (data.result !== "fail") {
        setWordle(data.word);
      }
    })();
  }, []);

  const handLetter = (letter) => {
    let row = current.row;
    let isEmpty = false;
    let col = 0;
    while (col < grid[row].length && !isEmpty) {
      if (grid[row][col] == "") {
        isEmpty = true;
      }
      col++;
    }
    switch (letter) {
      case "ENTER":
        if (current.row == 5) {
          return Notify({
            type: "error",
            message: "You can't go down anymore",
          });
        }
        handleEnter(isEmpty, grid[row].join(""));
        break;
      case "DELETE":
        handleDelete(row, col, isEmpty);
        break;
      default:
        // Letters A-Z
        if (isEmpty) {
          let gridCopy = [...grid];
          gridCopy[row][col - 1] = letter;
          setGrid(gridCopy);
        }
    }
  };

  const handleEnter = async (isEmpty, word) => {
    if (isEmpty) {
      return Notify({
        type: "warning",
        title: "Can not be empty",
        position: "bottom-center",
      });
    }

    const response = await fetch(
      `http://localhost:3000/api/check-word/${word}?id=${id}`
    );

    const data = await response.json();

    if (data.result === "fail") {
      return Notify({
        type: "danger",
        title: data.info,
        position: "bottom-center",
      });
    }

    let gridColorTemp = [...gridColor];

    for (let j = 0; j < 5; j++) {
      gridColorTemp[current.row][j] = "gray";
    }

    for (let j = 0; j < data.data.yellow.length; j++) {
      const element = data.data.yellow[j];
      gridColorTemp[current.row][element] = "yellow";
    }

    for (let j = 0; j < data.data.green.length; j++) {
      const element = data.data.green[j];
      gridColorTemp[current.row][element] = "green";
    }

    setGridColor(gridColorTemp);

    if (data.data.green.length === 5) {
      setWin(true);
      return Notify({
        type: "success",
        title: "You win",
        position: "bottom-center",
      });
    }

    if (current.row <= 4 && !win) {
      setCurrent({ row: current.row + 1 });
    } else if (current.row === 5 && !win) {
      return Notify({
        type: "danger",
        title: "You lose",
        position: "bottom-center",
      });
    }
  };

  const handleDelete = (row, col, isEmpty) => {
    let gridCopy = [...grid];
    let subtraction = 0;
    if (col >= 2 && isEmpty) subtraction = 2;
    else subtraction = 1;
    gridCopy[row][col - subtraction] = "";
    setGrid(gridCopy);
  };

  return (
    <div className="app">
      <div className="info">
        <h2 className="hint">Pista: {wordle}</h2>
      </div>
      <div className="grid">
        {grid.map((_, i) => (
          <div className="row" key={i}>
            {grid[i].map((_, j) => (
              <div
                className={`${grid[i][j] ? "col active" : "col"} ${
                  gridColor[i][j] == "green" ? "green" : ""
                }
                ${gridColor[i][j] == "yellow" ? "yellow" : ""} ${
                  gridColor[i][j] == "gray" ? "gray" : ""
                }`}
                key={j}
              >
                {grid[i][j]}{" "}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Keyboard onClick={handLetter} />
      <div id="notify" />
    </div>
  );
}

export default App;
