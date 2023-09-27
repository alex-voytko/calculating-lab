import { useContext } from "react";

import Icon from "./Icon";
import { appContext } from "../App";
import { IToolbarProps } from "../models";

function Toolbar({ checkboxes, checked, matrixLength }: IToolbarProps) {
  const {
    setCheckboxVisible,
    setCheckedIndexes,
    handleAddRow,
    handleRemoveRows,
  } = useContext(appContext);

  return (
    <div className="toolbar">
      <button
        className="btn btn-add"
        onClick={handleAddRow}
        disabled={checkboxes}
      >
        <Icon name="add" /> Add
      </button>
      <button
        className="btn btn-mark"
        onClick={() => {
          setCheckboxVisible(!checkboxes);
          setCheckedIndexes([]);
        }}
        disabled={!matrixLength}
      >
        <Icon name="mark" /> {checkboxes ? "Close mark" : "Mark"}
      </button>
      <button
        className="btn btn-remove"
        disabled={!checked}
        onClick={handleRemoveRows}
      >
        <Icon name="remove" />
        Remove
      </button>
    </div>
  );
}

export default Toolbar;
