"use client";

import { ItemData } from "@thatopen/fragments";
import { createContext, useCallback, useState } from "react";
import { TreeItem } from "../../../types";

export interface IViewerContext {
  spatialData: TreeItem[] | null;
  updateSpatialData: (data: TreeItem[] | null) => void;
  selectedElements: ItemData[] | null;
  updateSelectedElements: (elements: ItemData[] | null) => void;
  treeSelection: number[] | null;
  updateTreeSelection: (selection: number[] | null) => void;
  aperture: "perspective" | "orthographic";
  updateAperture: (aperture: "perspective" | "orthographic") => void;
  plansEnabled: boolean;
  updatePlansEnabled: (enable: boolean) => void;
  measurerEnabled: boolean;
  updateMeasurerEnabled: (enable: boolean) => void;
}

export const ViewerContext = createContext<IViewerContext>({
  spatialData: null,
  updateSpatialData: () => {},
  selectedElements: null,
  updateSelectedElements: () => {},
  treeSelection: null,
  updateTreeSelection: () => {},
  aperture: "perspective",
  updateAperture: () => {},
  plansEnabled: false,
  updatePlansEnabled: () => {},
  measurerEnabled: false,
  updateMeasurerEnabled: () => {},
});

type ViewerContextProviderProps = {
  children: React.ReactNode;
};

export function ViewerContextProvider({
  children,
}: ViewerContextProviderProps) {
  const [spatialData, setSpatialData] = useState<TreeItem[] | null>(null);
  const [selectedElements, setSelectedElements] = useState<ItemData[] | null>(
    null
  );

  const [treeSelection, setTreeSelection] = useState<number[] | null>(null);
  const [aperture, setAperture] = useState<"perspective" | "orthographic">(
    "perspective"
  );
  const [plansEnabled, setPlansEnabled] = useState(false);
  const [measurerEnabled, setMeasurerEnabled] = useState(false);

  const updateSpatialData = useCallback((data: TreeItem[] | null) => {
    setSpatialData(data);
  }, []);

  const updateSelectedElements = useCallback((elements: ItemData[] | null) => {
    setSelectedElements(elements);
  }, []);

  const updateTreeSelection = useCallback((selection: number[] | null) => {
    setTreeSelection(selection);
  }, []);

  const updateAperture = useCallback(
    (aperture: "perspective" | "orthographic") => {
      setAperture(aperture);
    },
    []
  );

  const updatePlansEnabled = useCallback((enable: boolean) => {
    setPlansEnabled(enable);
  }, []);

  const updateMeasurerEnabled = useCallback((enable: boolean) => {
    setMeasurerEnabled(enable);
  }, []);

  return (
    <ViewerContext.Provider
      value={{
        spatialData,
        updateSpatialData,
        selectedElements,
        updateSelectedElements,
        treeSelection,
        updateTreeSelection,
        aperture,
        updateAperture,
        plansEnabled,
        updatePlansEnabled,
        measurerEnabled,
        updateMeasurerEnabled,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
}
