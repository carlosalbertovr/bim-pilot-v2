"use client";

import { useContext } from "react";
import { ViewerContext } from "./context/ViewerContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../common/CustomAccordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../common/CustomTooltip";
import { CustomButton } from "../common/CustomButton";
import { PhosphorIcon } from "../common/PhosphorIcon";
import { toast } from "sonner";

export function RightSidebar() {
  const { selectedElements, updateSelectedElements } =
    useContext(ViewerContext);

  if (selectedElements) {
    return (
      <div className="w-64 border absolute right-2 top-2 bottom-2 bg-background dark:bg-card rounded-md shadow-md dark:shadow-none z-2">
        <div className="flex justify-between items-center py-2 px-4 border-b">
          <h2 className="text-xs font-semibold">Selection</h2>
          <CustomButton
            variant="ghost"
            className=" h-6 w-6"
            onClick={() => updateSelectedElements(null)}
          >
            <PhosphorIcon icon="X" size={4} weight="regular" />
          </CustomButton>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full border-b"
          defaultValue="item-1"
        >
          {selectedElements.map((element, index) => {
            const elementName =
              (
                element["Name"] as {
                  type: string;
                  value: string;
                }
              ).value || "Unnamed Element";

            return (
              <AccordionItem key={index} value={`element-${index}`}>
                <AccordionTrigger className="rounded-none p-4 py-2 no-underline hover:no-underline hover:bg-secondary cursor-pointer">
                  <h3 className="text-xs truncate text-left max-w-[180px] overflow-hidden whitespace-nowrap">
                    {elementName}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 border-t py-2">
                  {Object.entries(element).map(
                    ([attribute, valueRecord], index) => {
                      const attributeValue =
                        (valueRecord as { type: string; value: string })
                          .value || "Unnamed Attribute";
                      return (
                        <div
                          key={`attribute-${index}`}
                          className="grid grid-cols-5 px-4 gap-4"
                        >
                          <div className="col-span-2">
                            <h4 className="text-xs font-semibold">
                              {attribute}
                            </h4>
                          </div>
                          <div className="col-span-3">
                            <div className="relative group flex items-center">
                              <Tooltip delayDuration={500}>
                                <TooltipTrigger>
                                  <h4 className="text-xs truncate text-left max-w-[90px] overflow-hidden whitespace-nowrap">
                                    {attributeValue}
                                  </h4>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{attributeValue}</p>
                                </TooltipContent>
                              </Tooltip>
                              <CustomButton
                                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                                variant="outline"
                                onClick={() => {
                                  navigator.clipboard.writeText(attributeValue);
                                  toast.success("Copied to clipboard");
                                }}
                              >
                                <PhosphorIcon icon="Clipboard" size={8} />
                              </CustomButton>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  }

  return null;
}
