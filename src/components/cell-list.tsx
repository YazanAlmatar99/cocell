import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./cell-list-item";
const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    // @ts-ignore
    return cells.order.map((id) => {
      //@ts-ignore
      return cells.data[id];
    });
  });

  const renderedCells = cells.map((cell) => (
    <CellListItem cell={cell} key={cell.id} />
  ));
  return <div>{renderedCells}</div>;
};

export default CellList;
