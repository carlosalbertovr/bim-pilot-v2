import * as PhosphorIcons from "@phosphor-icons/react";

export type IconName = keyof typeof PhosphorIcons;

export type TreeItem = {
  label: string;
  value: string | TreeItem[];
  parentLabel?: string;
};
