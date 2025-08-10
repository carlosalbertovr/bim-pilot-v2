"use client";

import { useContext } from "react";
import { CustomButton } from "../common/CustomButton";
import { PhosphorIcon } from "../common/PhosphorIcon";
import { ViewerContext } from "./context/ViewerContext";

export function Controls() {
  const { aperture, updateAperture } = useContext(ViewerContext);
  return (
    <div className="absolute bottom-4 flex flex-row border left-1/2 -translate-x-1/2 bg-background dark:bg-card rounded-[0.5rem] shadow-md dark:shadow-none p-[0.25rem]">
      <CustomButton
        className="h-8 w-8 rounded-[0.25rem]"
        variant="ghost"
        tooltipLabel="Tree View"
      >
        <PhosphorIcon icon="TreeView" />
      </CustomButton>
      {/* Divider */}
      <div className="mx-2 h-6 w-px bg-border self-center" />
      {/* Visualization tools */}
      <div className="flex flex-row gap-0">
        <CustomButton
          className="h-8 w-8 rounded-[0.25rem]"
          variant="ghost"
          tooltipLabel="Extend view"
        >
          <PhosphorIcon icon="ArrowsOut" />
        </CustomButton>
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
        >
          <PhosphorIcon icon="VectorThree" />
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
        >
          <PhosphorIcon icon="Ruler" />
        </CustomButton>
      </div>
    </div>
  );
}
