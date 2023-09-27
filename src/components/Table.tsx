import { useEffect, useState, useContext } from "react";
import { nanoid } from "nanoid";
import { useDebouncedCallback } from "use-debounce";
import classNames from "classnames";

import {
  calculateAvarage,
  calculatePercentage,
  countSumm,
} from "../helpers/calculates";
import { Cell, IPercents, ITableProps } from "../models";
import TableCellMain from "./TableCellMain";
import TableCellAdditional from "./TableCellAdditional";
import { appContext } from "../App";
import Icon from "./Icon";

function Table({ matrix, checkboxes, checked }: ITableProps) {
  const { setMatrix, setCheckedIndexes } = useContext(appContext);

  const [sums, setSums] = useState<number[]>([]);
  const [average, setAverage] = useState<number[]>([]);
  const [showNearest, setShowNearest] = useState<null | Cell>(null);
  const [percents, setPercents] = useState<null | IPercents>(null);

  const handleIncrement = (row: number, col: number) => {
    const incrementedNum = matrix[row][col].amount + 1;
    const matrixCopy = [...matrix];
    matrixCopy[row][col].amount = incrementedNum;
    setMatrix(matrixCopy);
  };

  const debouncedTableCellHover = useDebouncedCallback((e) => {
    const { rowIndex, cellIndex } = e.target.closest(".data-cell").dataset;
    if (!showNearest) {
      setShowNearest(matrix[Number(rowIndex)][Number(cellIndex)]);
    }
  }, 300);

  const debouncedTableCellLeave = useDebouncedCallback(
    () => setShowNearest(null),
    300
  );

  const debouncedSumHover = useDebouncedCallback((e) => {
    const { index } = e.target.dataset;
    setPercents({
      index,
      row: matrix[Number(index)].map((nData) =>
        calculatePercentage(nData.amount, sums[Number(index)])
      ),
    });
  }, 300);

  const debouncedSumLeave = useDebouncedCallback(() => {
    setPercents(null);
  }, 300);

  useEffect(() => {
    if (matrix && matrix.length > 0) {
      setSums(matrix.map((row) => countSumm(row.map((cell) => cell.amount))));
      setAverage(
        matrix[0].map((_, colIndex) =>
          calculateAvarage(
            countSumm(matrix.map((item) => item[colIndex].amount)),
            matrix.length
          )
        )
      );
    }
  }, [matrix]);

  return (
    <table>
      {matrix.length > 0 && (
        <>
          <thead>
            <tr>
              <th></th>
              {matrix[0].map((_, theadIndex) => (
                <th key={nanoid()}>N = {theadIndex + 1}</th>
              ))}
              <th>Sum values</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={nanoid()}>
                <td
                  className={classNames({ selecting: checkboxes })}
                  onClick={
                    checkboxes
                      ? () =>
                          setCheckedIndexes(
                            checked.includes(rowIndex)
                              ? checked.filter((item) => item !== rowIndex)
                              : [...checked, rowIndex]
                          )
                      : undefined
                  }
                >
                  M = {rowIndex + 1}
                  {checkboxes && (
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        className={classNames("checkbox", {
                          marked: checked.includes(rowIndex),
                        })}
                      />
                      {checked.includes(rowIndex) && (
                        <div className="mark-container">
                          <Icon name="mark" />
                        </div>
                      )}
                    </div>
                  )}
                </td>
                {row.map((cell, cellIndex) => (
                  <TableCellMain
                    key={nanoid()}
                    percents={percents}
                    rowIndex={rowIndex}
                    cellIndex={cellIndex}
                    cell={cell}
                    onIncrement={() => handleIncrement(rowIndex, cellIndex)}
                    onMouseMove={debouncedTableCellHover}
                    onMouseLeave={debouncedTableCellLeave}
                    showNearest={showNearest}
                  />
                ))}
                <TableCellAdditional
                  rowIndex={rowIndex}
                  sums={sums}
                  onMouseMove={debouncedSumHover}
                  onMouseLeave={debouncedSumLeave}
                />
              </tr>
            ))}
            <tr className="average-row">
              <td>Average</td>
              {average.map((num) => (
                <td key={nanoid()}>{num}</td>
              ))}
              <td></td>
            </tr>
          </tbody>
        </>
      )}
    </table>
  );
}

export default Table;
