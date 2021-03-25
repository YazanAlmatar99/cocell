import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    // @ts-ignore
    return cells.order.map((id) => {
      //@ts-ignore
      return cells.data[id];
    });
  });

  const renderedCells = cells.map((cell) => (
    <>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} key={cell.id} />
    </>
  ));
  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  );
};

export default CellList;
