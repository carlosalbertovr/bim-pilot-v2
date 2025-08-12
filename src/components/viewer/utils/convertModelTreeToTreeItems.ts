import { TreeItem } from "../../../types";

type SpatialTreeItem = {
  category: string | null;
  localId: number | null;
  children?: SpatialTreeItem[];
};

const CATEGORIES_TO_REMOVE = ["IFCBUILDINGELEMENTPROXY", "IFCELEMENTASSEMBLY", ]


export function convertModelTreeToTreeItems(tree: SpatialTreeItem): TreeItem[] {
  function convert(node: SpatialTreeItem, parentLabel?: string): TreeItem | null {
    if (node.category && CATEGORIES_TO_REMOVE.includes(node.category)) {
      return null;
    }
    const labelParts = [];
    if (node.category) labelParts.push(node.category);
    if (node.localId !== null && node.localId !== undefined)
      labelParts.push(String(node.localId));
    const label = labelParts.join(" - ") || "Unnamed Node";

    const children = node.children?.length
      ? node.children
          .map(child => convert(child, label))
          .filter((child): child is TreeItem => child !== null)
      : [];

    const treeItem: TreeItem = {
      label,
      value: children.length > 0 ? children : "",
    };
    if (parentLabel) {
      treeItem.parentLabel = parentLabel;
    }
    return treeItem;
  }

  const result = convert(tree);
  return result ? [result] : [];
}
