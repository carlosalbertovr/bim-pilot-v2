"use client";

import * as PhosphorIcons from "@phosphor-icons/react";
import { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import { IconName } from "../../types";
import { cn } from "../../lib/utils";

type Props = Readonly<{
  icon: IconName;
  size?: number;
  weight?: IconProps["weight"];
  highlight?: boolean;
  className?: string;
}>;

const DEFAULT_SIZE = 18;
const DEFAULT_WEIGHT = "duotone";

export function PhosphorIcon({
  icon,
  size,
  weight,
  highlight,
  className,
}: Props) {
  const IconComponent = PhosphorIcons[icon] as ComponentType<IconProps>;

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in @phosphor-icons/react`);
    return null;
  }

  return (
    <IconComponent
      size={size || DEFAULT_SIZE}
      weight={weight || DEFAULT_WEIGHT}
      className={cn([
        highlight && "text-brand-primary dark:text-brand-primary-dark",
        className,
      ])}
    />
  );
}
