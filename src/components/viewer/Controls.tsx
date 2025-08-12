"use client";

import { useContext, useState } from "react";
import { CustomButton } from "../common/CustomButton";
import { PhosphorIcon } from "../common/PhosphorIcon";
import { ViewerContext } from "./context/ViewerContext";
import { LeftSidebar } from "./LeftSidebar";

export function Controls() {
  const {
    aperture,
    updateAperture,
    plansEnabled,
    updatePlansEnabled,
    measurerEnabled,
    updateMeasurerEnabled,
  } = useContext(ViewerContext);

  const [leftSidebarIsOpen, setLeftSidebarIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="absolute top-16 sm:bottom-4 sm:top-auto left-1/2 -translate-x-1/2 flex flex-row border bg-background dark:bg-card rounded-[0.5rem] shadow-md dark:shadow-none p-[0.25rem]">
        <CustomButton
          className="h-8 w-8 rounded-[0.25rem]"
          variant="ghost"
          tooltipLabel="Tree View"
          onClick={() => setLeftSidebarIsOpen(!leftSidebarIsOpen)}
        >
          <PhosphorIcon icon="TreeView" highlight={leftSidebarIsOpen} />
        </CustomButton>
        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-border self-center" />
        {/* Visualization tools */}
        <div className="flex flex-row gap-0">
          <CustomButton
            className="h-8 w-8 rounded-[0.25rem]"
            variant="ghost"
            tooltipLabel={
              aperture === "perspective" ? "Perspective" : "Orthographic"
            }
            onClick={function () {
              updateAperture(
                aperture === "perspective" ? "orthographic" : "perspective"
              );
            }}
          >
            <PhosphorIcon
              icon={aperture === "perspective" ? "Aperture" : "CubeTransparent"}
            />
          </CustomButton>
          <CustomButton
            className="h-8 w-8 rounded-[0.25rem]"
            variant="ghost"
            tooltipLabel="Planes"
            onClick={function () {
              updatePlansEnabled(!plansEnabled);
              updateMeasurerEnabled(false);
            }}
          >
            <PhosphorIcon icon="VectorThree" highlight={plansEnabled} />
          </CustomButton>
          <CustomButton
            className="h-8 w-8 rounded-[0.25rem]"
            variant="ghost"
            tooltipLabel="Views"
          >
            <PhosphorIcon icon="Stack" />
          </CustomButton>
          <CustomButton
            className="h-8 w-8 rounded-[0.25rem]"
            variant="ghost"
            tooltipLabel="Measure"
            onClick={() => {
              updateMeasurerEnabled(!measurerEnabled)
            }}
          >
            <PhosphorIcon icon="Ruler" highlight={measurerEnabled} />
          </CustomButton>
        </div>
      </div>
      {leftSidebarIsOpen && (
        <LeftSidebar
          isOpen={leftSidebarIsOpen}
          onClose={() => setLeftSidebarIsOpen(false)}
        />
      )}
    </>
  );
}
