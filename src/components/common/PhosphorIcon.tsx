"use client";

import * as PhosphorIcons from "@phosphor-icons/react";
import { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import { IconName } from "../../types";

type Props = Readonly<{
  icon: IconName;
  size?: number;
  weight?: IconProps["weight"];
}>;

const DEFAULT_SIZE = 18;
const DEFAULT_WEIGHT = "duotone";

export function PhosphorIcon({ icon, size, weight }: Props) {
  const IconComponent = PhosphorIcons[icon] as ComponentType<IconProps>;

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in @phosphor-icons/react`);
    return null;
  }

  return (
    <IconComponent
      size={size || DEFAULT_SIZE}
      weight={weight || DEFAULT_WEIGHT}
    />
  );
}
