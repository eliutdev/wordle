import { useState, useEffect } from "react";
import "./App.css";

import { Notify } from "@reliutg/buzz-notify";
import "@reliutg/buzz-notify/dist/buzz-notify.css";

import Keyboard from "./components/Keyboard";
import ThemeToggler from "./components/ThemeToggler";

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Z", "X", "C", "V", "B", "N", "M"],
].flat();

function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ""))
  );
  const [gridColor, setGridColor] = useState(
    Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ""))
  );
  const [keywordsColor, setKeywordsColor] = useState(() => {
    return Array.from({ length: KEYS.length }, (_, index) => {
      return {
        key: KEYS[index],
        color: "rgb(211, 214, 218)",
      };
    });
  });
  const [current, setCurrent] = useState({ row: 0 });
  const [id] = useState(crypto.randomUUID());
  const [win, setWin] = useState(false);
  const [, setWordle] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/start-game/${id}`);
      const data = await response.json();
      console.log(data);
      if (data.result !== "fail") {
        setWordle(data.word);
      }
    })();
  }, []);

  const updateKeywordsColor = () => {
    grid.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col !== "") {
          setKeywordsColor((prev) =>
            prev.map((keyword) => {
              if (keyword.key === col) {
                return {
                  ...keyword,
                  color: gridColor[i][j],
                };
              }
              return keyword;
            })
          );
        }
      });
    });
  };

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
            type: "danger",
            title: "You can't go down anymore",
            position: "bottom-center",
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

    const response = await fetch(`/api/check-word/${word}?id=${id}`);

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

    updateKeywordsColor();
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
        <h2 className="hint">Wordle</h2>
        <ThemeToggler />
      </div>
      <div className="grid-wrapper">
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
      </div>
      <Keyboard onClick={handLetter} colors={keywordsColor} />
      <div id="notify" />
    </div>
  );
}

export default App;
