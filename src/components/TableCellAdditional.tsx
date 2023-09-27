import { ITableCellAdditionalProps } from "../models";

function TableCellAdditional({
  rowIndex,
  onMouseMove,
  onMouseLeave,
  sums,
}: ITableCellAdditionalProps) {
  return (
    <td
      data-index={rowIndex}
      className="sum-cell"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {sums[rowIndex]}
    </td>
  );
}

export default TableCellAdditional;
