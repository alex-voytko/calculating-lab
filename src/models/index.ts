import React, { SetStateAction } from "react";
import { DebouncedState } from "use-debounce";

// Main App Context:
export interface IAppContext {
  setMatrix: React.Dispatch<SetStateAction<Cell[][]>>;
  setCheckboxVisible: React.Dispatch<SetStateAction<boolean>>;
  setCheckedIndexes: React.Dispatch<SetStateAction<number[]>>;
  setIsDarkTheme: React.Dispatch<SetStateAction<boolean>>;
  handleAddRow: () => void;
  handleRemoveRows: () => void;
  isDarkTheme: boolean;
}

// Table:
type CellId = number; // unique value for all table
type CellValue = number; // three digit random number

export type Cell = {
  id: CellId;
  amount: CellValue;
};

export interface IPercents {
  index: string;
  row: number[];
}

// Props:
interface IAppProps {
  checkboxes: boolean;
}
export interface IToolbarProps extends IAppProps {
  checked: boolean;
  matrixLength: number;
}
export interface ITableProps extends IAppProps {
  matrix: Cell[][];
  checked: number[];
}

interface ITableCellProps {
  rowIndex: number;
  onMouseMove: DebouncedState<(e: any) => void>;
  onMouseLeave: DebouncedState<() => void>;
}

export interface ITableCellMainProps extends ITableCellProps {
  percents: null | IPercents;
  cell: Cell;
  cellIndex: number;
  showNearest: null | Cell;
  onIncrement: () => void;
}

export interface ITableCellAdditionalProps extends ITableCellProps {
  sums: number[];
}

export interface IIconProps {
  name: "remove" | "increment" | "mark" | "add" | "moon" | "sun";
  onClick?: () => void;
}

// Theme:
export enum DarkTheme {
  ClassName = "is-dark",
  Key = "theme-dark",
  Value = "dark",
}
