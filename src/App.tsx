import { createContext, useEffect, useState } from "react";

import { Cell, DarkTheme, IAppContext } from "./models";
import Table from "./components/Table";
import Toolbar from "./components/Toolbar";
import { initialMatrixBuilder } from "./helpers/initialMatrixBuilder";
import { randomNumber } from "./helpers/randomNumber";
import AppBar from "./components/AppBar";

export const appContext = createContext({} as IAppContext);

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [matrix, setMatrix] = useState<Cell[][]>(initialMatrixBuilder());
  const [checkboxVisible, setCheckboxVisible] = useState<boolean>(false);
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);

  const handleAddRow = () => {
    const bigestId =
      matrix[matrix.length - 1]?.[matrix[matrix.length - 1]?.length - 1].id;
    const newRow: Cell[] = [
      { amount: randomNumber(), id: bigestId ? bigestId + 1 : 0 },
      { amount: randomNumber(), id: bigestId ? bigestId + 2 : 1 },
    ];
    setMatrix([...matrix, newRow]);
  };

  const handleRemoveRows = () => {
    setMatrix(matrix.filter((_, index) => !checkedIndexes.includes(index)));
    setCheckboxVisible(false);
    setCheckedIndexes([]);
  };

  useEffect(() => {
    if (localStorage.getItem(DarkTheme.Key)) {
      setIsDarkTheme(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add(DarkTheme.ClassName);
      localStorage.setItem(DarkTheme.Key, DarkTheme.Value);
    } else {
      document.body.classList.remove(DarkTheme.ClassName);
      localStorage.removeItem(DarkTheme.Key);
    }
  }, [isDarkTheme]);

  return (
    <appContext.Provider
      value={{
        setMatrix,
        setCheckboxVisible,
        setCheckedIndexes,
        handleAddRow,
        handleRemoveRows,
        setIsDarkTheme,
        isDarkTheme,
      }}
    >
      <AppBar />
      <div className="app">
        <Toolbar
          checkboxes={checkboxVisible}
          checked={checkedIndexes.length > 0}
          matrixLength={matrix.length}
        />
        <Table
          matrix={matrix}
          checkboxes={checkboxVisible}
          checked={checkedIndexes}
        />
      </div>
    </appContext.Provider>
  );
}

export default App;
