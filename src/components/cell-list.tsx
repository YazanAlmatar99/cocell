import "./cell-list.css";
import { useHistory } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";
//@ts-ignore
const CellList: React.FC = () => {
  const history = useHistory();
  const onClick = () => {
    history.push({
      pathname: "/",
    });
  };
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
      <button className="button is-small is-secondary" onClick={onClick}>
        Go Back
      </button>
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
