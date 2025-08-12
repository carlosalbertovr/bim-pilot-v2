import { useContext, useState } from "react";
import "./styles/tree.css";
import { ViewerContext } from "./context/ViewerContext";
import { PhosphorIcon } from "../common/PhosphorIcon";
import { cn } from "../../lib/utils";
import { TreeItem } from "../../types";

type AttributeTreeProps = {
  attributes: TreeItem[];
  isModelTree?: boolean;
};

export function AttributesTree(props: AttributeTreeProps) {
  const { attributes, isModelTree } = props;

  const { treeSelection, updateTreeSelection } = useContext(ViewerContext);

  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    setOpenDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTree = (items: TreeItem[], parentKey = "", isChild?: boolean) => {
    return items.map((item, index) => {
      const key = `${parentKey}-${index}`;
      const isOpen = openDetails[key] || false;

      if (Array.isArray(item.value)) {
        return (
          <li key={key} className={cn("list-none")}>
            <div
              className={cn(
                "transition-all duration-300 ease-in-out text-gray-400",
                isChild ? "ml-6" : "ml-0",
                isOpen ? "tree-border" : undefined
              )}
            >
              <summary
                className={cn(
                  "text-sm flex flex-row items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-secondary rounded-md py-[0.1rem]",
                  isOpen ? "text-foreground" : "hover:text-foreground"
                )}
              >
                <button
                  className={cn(
                    "px-2 py-1 flex flex-row items-center gap-2 w-full text-left cursor-pointer"
                  )}
                  onClick={() => handleToggle(key)}
                >
                  <PhosphorIcon
                    icon="CaretRight"
                    size={12}
                    weight="regular"
                    className={cn([
                      "transition-all duration-100 ease-in-out",
                      isOpen ? "rotate-90" : "rotate-0",
                    ])}
                  />
                  {isModelTree && (
                    <PhosphorIcon size={12} icon="FolderSimple" />
                  )}
                  <p
                    className={cn([
                      "text-xs flex gap-1 items-center",
                      isOpen ? "text-foreground" : "text-muted-foreground",
                    ])}
                  >
                    {item.parentLabel &&
                      isNaN(Number(item.parentLabel)) &&
                      item.parentLabel + ": "}
                    {item.label}
                    {isModelTree && (
                      <span className={cn(["text-xs text-muted-foreground"])}>
                        {item.value.length > 0 ? ` (${item.value.length})` : ""}
                      </span>
                    )}
                  </p>
                </button>
              </summary>
              {isOpen && (
                <ul className={cn("animate-fade-down animate-duration-250")}>
                  {renderTree(item.value, key, true)}
                </ul>
              )}
            </div>
          </li>
        );
      } else if (!isModelTree) {
        return (
          <li
            key={key}
            className={cn(["flex flex-col gap-1", isChild ? "ml-6" : "ml-0"])}
          >
            <div className="pb-3">
              <p className={cn(["text-xs capitalize"])}>{item.label}: </p>
              <div
                className={cn([
                  "flex flex-row items-center gap-2 bg-secondary px-2 py-1 rounded-md",
                ])}
              >
                <p className={cn(["text-sm dark:text-white"])}>
                  {item.value === "" ? "N/A" : item.value}
                </p>
              </div>
            </div>
          </li>
        );
      } else {
        return (
          <li
            key={key}
            className={cn(["flex flex-col gap-1", isChild ? "ml-6" : "ml-0"])}
          >
            <div
              onClick={() => {
                updateTreeSelection([Number(item.label)]);
              }}
              className={cn([
                "flex items-center gap-2 cursor-pointer transition-all duration-200 font-semibold ease-in-out hover:bg-secondary rounded-md py-1 px-2",
                // selectedLocalId === Number(item.label)
                //   ? "bg-gray-800"
                //   : undefined,
              ])}
            >
              <PhosphorIcon size={12} icon="Cube" />
              <p className={cn(["text-xs dark:text-white"])}>{item.label}</p>
            </div>
          </li>
        );
      }
    });
  };

  return (
    <ul className={cn("w-full h-full overflow-hidden ")}>
      {renderTree(attributes)}
    </ul>
  );
}
