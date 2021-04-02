import "./cell-list.css";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";
const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    // @ts-ignore
    return cells.order.map((id) => {
      //@ts-ignore
      return cells.data[id];
    });
  });

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
