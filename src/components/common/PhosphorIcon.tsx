import * as PhosphorIcons from "@phosphor-icons/react";
import { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import { IconName } from "../../types";

type Props = Readonly<{
  icon: IconName;
  customSize?: number;
  customWeight?: IconProps["weight"];
}>;

const DEFAULT_SIZE = 18;
const DEFAULT_WEIGHT = "duotone";

export function PhosphorIcon({ icon, customSize, customWeight }: Props) {
  const IconComponent = PhosphorIcons[icon] as ComponentType<IconProps>;

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in @phosphor-icons/react`);
    return null;
  }

  return (
    <IconComponent
      size={customSize || DEFAULT_SIZE}
      weight={customWeight || DEFAULT_WEIGHT}
    />
  );
}
