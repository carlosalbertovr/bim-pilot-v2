import { useContext } from "react";
import { CustomButton } from "../common/CustomButton";
import { PhosphorIcon } from "../common/PhosphorIcon";
import { ViewerContext } from "./context/ViewerContext";
import { AttributesTree } from "./AttributesTree";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function LeftSidebar({ isOpen, onClose }: Props) {
  const { spatialData } = useContext(ViewerContext);

  if (isOpen) {
    return (
      <div className="w-[28rem] border absolute left-2 top-2 bottom-2 bg-background dark:bg-card rounded-md shadow-md overflow-y-hidden pb-10 dark:shadow-none z-2">
        <div className="flex justify-between items-center py-2 px-4 border-b">
          <h2 className="text-xs font-semibold">Model tree</h2>
          <CustomButton variant="ghost" className=" h-6 w-6" onClick={onClose}>
            <PhosphorIcon icon="X" size={4} weight="regular" />
          </CustomButton>
        </div>
        {spatialData ? (
          <div className="flex flex-col gap-4 overflow-y-auto h-full">
            <div>
              <AttributesTree attributes={spatialData} isModelTree />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm dark:text-white">
              El modelo no está disponible
            </p>
          </div>
        )}
      </div>
    );
  }

  return null;
}
