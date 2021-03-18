export type CellTypes = "code" | "text";

export interface Cell {
  id: String;
  type: CellTypes;
  content: string;
}
