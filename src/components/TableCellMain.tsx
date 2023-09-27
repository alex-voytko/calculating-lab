import { useContext } from "react";
import { nanoid } from "nanoid";
import classNames from "classnames";

import Icon from "./Icon";
import { appContext } from "../App";
import { ITableCellMainProps } from "../models";

function TableCellMain({
  percents,
  cell,
  rowIndex,
  cellIndex,
  onIncrement,
  onMouseMove,
  onMouseLeave,
  showNearest,
}: ITableCellMainProps) {
  const { isDarkTheme } = useContext(appContext);

  const assignColor = () => {
    if (showNearest && showNearest.id !== cell.id) {
      return `rgba(${isDarkTheme ? "26,109,164" : "42,142,209"},${
        (100 - Math.abs(showNearest.amount - cell.amount)) / 100
      })`;
    }
    return "transparent";
  };

  return (
    <td
      key={nanoid()}
      className={classNames("data-cell", {
        percentage: percents?.index === String(rowIndex),
      })}
      data-row-index={rowIndex}
      data-cell-index={cellIndex}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        background: assignColor(),
      }}
    >
      <p>{cell.amount}</p>
      <span>{percents?.row[cellIndex]}%</span>
      <span
        className="gradient"
        style={{ width: `${percents?.row[cellIndex]}%` }}
      ></span>
      <Icon name="increment" onClick={onIncrement} />
    </td>
  );
}

export default TableCellMain;
