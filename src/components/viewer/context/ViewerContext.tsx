"use client";

import { ItemData } from "@thatopen/fragments";
import { createContext, useCallback, useState } from "react";

export interface IViewerContext {
  selectedElements: ItemData[] | null;
  updateSelectedElements: (elements: ItemData[] | null) => void;
  aperture: "perspective" | "orthographic";
  updateAperture: (aperture: "perspective" | "orthographic") => void;
}

export const ViewerContext = createContext<IViewerContext>({
  selectedElements: null,
  updateSelectedElements: () => {},
  aperture: "perspective",
  updateAperture: () => {},
});

type ViewerContextProviderProps = {
  children: React.ReactNode;
};

export function ViewerContextProvider({
  children,
}: ViewerContextProviderProps) {
  const [selectedElements, setSelectedElements] = useState<ItemData[] | null>(
    null
  );
  const [aperture, setAperture] = useState<"perspective" | "orthographic">(
    "perspective"
  );

  const updateSelectedElements = useCallback((elements: ItemData[] | null) => {
    setSelectedElements(elements);
  }, []);

  const updateAperture = useCallback(
    (aperture: "perspective" | "orthographic") => {
      setAperture(aperture);
    },
    []
  );

  return (
    <ViewerContext.Provider
      value={{
        selectedElements,
        updateSelectedElements,
        aperture,
        updateAperture,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
}
